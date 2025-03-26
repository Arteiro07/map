"use client";
import { MapContext } from "@/src/context/mapContext";
import { ViewContext } from "@/src/context/viewContext";
import { ZoomContext } from "@/src/context/zoomContext";
import { useContext } from "react";
import { useMapEvents } from "react-leaflet";

export default function MapControlls() {
	const { setIsGlobe } = useContext(MapContext);
	const { setCoords } = useContext(ViewContext);
	const { setZoom } = useContext(ZoomContext);

	const map = useMapEvents({
		zoomend: (e) => {
			setZoom(e.target.getZoom());
			if (map.getZoom() < 3) {
				setZoom(3);
				setIsGlobe(true);
			}
		},
		moveend: (e) => {
			console.log(e.target.getCenter());
			setCoords({
				lattitude: e.target.getCenter().lat,
				longitude: e.target.getCenter().lng,
			});
		},
	});
	return <></>;
}
