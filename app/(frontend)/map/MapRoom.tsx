"use client";
import { Marker as MarkerType } from "@/payload-types";
import { MapContext, MapProvider } from "@/src/context/mapContext";
import { useContext } from "react";
import { ClientComponent } from "./ClientComponent";
import FiberCanvas from "./FiberCanvas";

export default function MapRoom({ markers }: { markers: MarkerType[] }) {
	return (
		<>
			<MapProvider>
				<MapDecider markers={markers} />
			</MapProvider>
		</>
	);
}

function MapDecider({ markers }: { markers: MarkerType[] }) {
	const { isGlobe } = useContext(MapContext);
	return (
		<>
			{isGlobe && <FiberCanvas markers={markers} />}
			{!isGlobe && <ClientComponent markers={markers} />}
		</>
	);
}
