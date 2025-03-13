"use client";
import { Marker as MarkerType } from "@/payload-types";
import { MapContext, MapProvider } from "@/src/context/mapContext";
import { ViewProvider } from "@/src/context/viewContext";
import { ZoomProvider } from "@/src/context/zoomContext";
import dynamic from "next/dynamic";
import { useContext } from "react";
import FiberCanvas from "./FiberCanvas";
import SelectionBox from "./SelectionBox";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapRoom({ markers }: { markers: MarkerType[] }) {
	return (
		<>
			<ZoomProvider>
				<ViewProvider>
					<MapProvider>
						<SelectionBox />
						<MapDecider markers={markers} />
					</MapProvider>
				</ViewProvider>
			</ZoomProvider>
		</>
	);
}

function MapDecider({ markers }: { markers: MarkerType[] }) {
	const { isGlobe } = useContext(MapContext);
	return (
		<>
			{/* Filter markers */}
			{isGlobe && <FiberCanvas markers={markers} />}
			{!isGlobe && <Map markers={markers} />}
		</>
	);
}
