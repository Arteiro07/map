import { Marker as MarkerType } from "@/payload-types";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "./Earth";

export default function FiberCanvas({ markers }: { markers: MarkerType[] }) {
	return (
		<>
			<Canvas>
				<pointLight color="#f6f3ea" position={[2, 0, 2]} intensity={6.2} />
				<Suspense fallback={null}>
					<Earth />
				</Suspense>
			</Canvas>
		</>
	);
}
