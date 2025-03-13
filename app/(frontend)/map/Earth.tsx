"use client";
import { Marker as MarkerType } from "@/payload-types";
import { MapContext } from "@/src/context/mapContext";
import { ViewContext } from "@/src/context/viewContext";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useContext, useRef } from "react";
import {
	DoubleSide,
	MathUtils,
	Object3D,
	Quaternion,
	TextureLoader,
	Vector3,
} from "three";

const seasonColors: Record<string, string> = {
	spring: "#77DD77", // Soft Green
	summer: "#FFA500", // Bright Orange
	autumn: "#D2691E", // Warm Brown
	winter: "#1E90FF", // Cool Blue
};

export default function Earth({ markers }: { markers: MarkerType[] }) {
	const earthRef = useRef<Object3D>(null);
	const cloudsRef = useRef<Object3D>(null);
	const { setIsGlobe } = useContext(MapContext);
	const { coords, setCoords } = useContext(ViewContext);
	const EarthCloudstexture = useLoader(
		TextureLoader,
		"textures/8k_earth_clouds.jpg"
	);
	const EarthSpecularTexture = useLoader(
		TextureLoader,
		"textures/8k_earth_specular_map.jpg"
	);
	const EarthDayTexture = useLoader(
		TextureLoader,
		"textures/8k_earth_daymap.jpg"
	);
	const EarthNormalTexture = useLoader(
		TextureLoader,
		"textures/8k_earth_normal_map.jpg"
	);

	useFrame(({ camera }) => {
		const camPos = camera.position.clone();

		// Get camera direction (unit vector)
		const camDir = new Vector3();
		camera.getWorldDirection(camDir);

		// Project direction to sphere radius
		const intersection = camPos.add(
			camDir.multiplyScalar(-camPos.length() + 1)
		);

		// Convert (x, y, z) to Lat/Lng
		let lat = 90 - MathUtils.radToDeg(Math.acos(intersection.y));
		lat = MathUtils.clamp(lat, -90, 90);

		let lng = MathUtils.radToDeg(Math.atan2(intersection.x, intersection.z));
		lng = ((lng + 180) % 360) - 180;

		setCoords({ lattitude: lat ? lat : 0, longitude: lng });
		if (camera.position.length() < 1.6) {
			setIsGlobe(false);
		} else {
		}
	});
	useFrame(({ camera }) => {
		// setView position
	});

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		if (earthRef.current && cloudsRef.current) {
			earthRef.current.rotation.y = elapsedTime / 100;
			//earthRef.current.rotation.z = -elapsedTime / 100;
			cloudsRef.current.rotation.y = elapsedTime / 60;
			cloudsRef.current.rotation.x = elapsedTime / 120;
		}
	});

	return (
		<>
			<ambientLight intensity={1.2} />
			<pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={1.2} />
			<Stars
				radius={300}
				depth={60}
				count={20000}
				factor={7}
				saturation={0}
				fade={true}
			/>
			<mesh ref={cloudsRef}>
				<sphereGeometry args={[1.01, 32, 32]} />
				<meshPhongMaterial
					map={EarthCloudstexture}
					opacity={0.4}
					depthWrite={true}
					transparent={true}
					side={DoubleSide}
				/>
			</mesh>
			<group ref={earthRef}>
				<Markers markers={markers} />
				<mesh rotation={[0, 0, 0]}>
					<sphereGeometry args={[1, 32, 32]} />
					<meshPhongMaterial specularMap={EarthSpecularTexture} />
					<meshStandardMaterial
						map={EarthDayTexture}
						normalMap={EarthNormalTexture}
						metalness={0.4}
						roughness={0.7}
					/>
				</mesh>
			</group>
			<OrbitControls
				enableZoom={true}
				enablePan={true}
				enableRotate={true}
				zoomSpeed={0.6}
				panSpeed={0.5}
				rotateSpeed={0.4}
			/>
		</>
	);
}

const Markers = ({ markers }: { markers: MarkerType[] }) => {
	return (
		<>
			{markers.map((marker, index) => {
				// Compute position on sphere
				const position = latLngToCartesian(
					marker.coordinates.latitude,
					marker.coordinates.longitude
				);

				// Compute normal (same as position but normalized)
				const normal = position.clone().normalize();

				// Compute quaternion to align the cylinder's Y-axis (0,1,0) with the normal
				const quaternion = new Quaternion().setFromUnitVectors(
					new Vector3(0, 1, 0),
					normal
				);

				return (
					<mesh key={index} position={position} quaternion={quaternion}>
						<cylinderGeometry
							args={[0.005, 0.005, 0.05 * (1 + marker.rating / 10), 32]}
						/>
						<meshLambertMaterial
							color={seasonColors[marker.season] || "#FFFFFF"}
						/>
					</mesh>
				);
			})}
		</>
	);
};

function latLngToCartesian(
	lat: number,
	lng: number,
	radius: number = 1,
	origin: [number, number, number] = [0, 0, 0]
): Vector3 {
	// Convert degrees to radians
	const latRad = (lat * Math.PI) / 180;
	const lngRad = (lng * Math.PI) / 180;

	// Compute Cartesian coordinates relative to the sphere's center
	const x = radius * Math.cos(latRad) * Math.cos(lngRad) + origin[0];
	const y = radius * Math.cos(latRad) * Math.sin(lngRad) + origin[1];
	const z = radius * Math.sin(latRad) + origin[2];

	return new Vector3(x, z, -y);
}
