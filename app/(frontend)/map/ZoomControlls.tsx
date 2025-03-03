"use client";
import { MapContext } from "@/src/context/mapContext";
import { useContext } from "react";
import { useMapEvents } from "react-leaflet";

export default function ZoomControlls() {
	const { isGlobe, setIsGlobe } = useContext(MapContext);

	const map = useMapEvents({
		zoomend: (e) => {
			if (map.getZoom() < 3) {
				console.log(map.getZoom());
				console.log(isGlobe);
				window.alert("hello" + isGlobe);
				setIsGlobe(true);
			}
		},
	});
	return <></>;
}
