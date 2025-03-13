import { Marker as MarkerType } from "@/payload-types";
import { ViewContext } from "@/src/context/viewContext";
import { Canvas } from "@react-three/fiber";
import { Suspense, useContext } from "react";
import { Vector3 } from "three";
import Earth from "./Earth";

export default function FiberCanvas({ markers }: { markers: MarkerType[] }) {
	const { coords } = useContext(ViewContext);

	const latRad = (coords.lattitude * Math.PI) / 180;
	const lngRad = (coords.longitude * Math.PI) / 180;

	// Compute initial position
	const initialPosition = new Vector3().setFromSphericalCoords(
		1.7,
		latRad,
		lngRad
	);
	return (
		<>
			<Canvas camera={{ position: initialPosition }}>
				<pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={6.2} />
				<Suspense fallback={null}>
					<Earth markers={markers} />
				</Suspense>
			</Canvas>
		</>
	);
}
