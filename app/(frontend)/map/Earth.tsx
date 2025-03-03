"use client";
import { OrbitControls, Stars } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Object3D, TextureLoader } from "three";

export default function Earth() {
	const earthRef = useRef<Object3D>(null);
	const cloudsRef = useRef<Object3D>(null);
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

	useFrame(({ clock }) => {
		const elapsedTime = clock.getElapsedTime();
		if (earthRef.current && cloudsRef.current) {
			earthRef.current.rotation.y = elapsedTime / 40;
			//earthRef.current.rotation.z = -elapsedTime / 100;
			cloudsRef.current.rotation.y = elapsedTime / 60;
			cloudsRef.current.rotation.x = elapsedTime / 120;
		}
	});
	return (
		<>
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
			<mesh ref={earthRef}>
				<sphereGeometry args={[1, 32, 32]} />
				<meshPhongMaterial specularMap={EarthSpecularTexture} />
				<meshStandardMaterial
					map={EarthDayTexture}
					normalMap={EarthNormalTexture}
					metalness={0.4}
					roughness={0.7}
				/>
				<OrbitControls
					enableZoom={true}
					enablePan={true}
					enableRotate={true}
					zoomSpeed={0.6}
					panSpeed={0.5}
					rotateSpeed={0.4}
				/>
			</mesh>
		</>
	);
}
