"use client";
import { Marker as MarkerType } from "@/payload-types";
import { LayerContext } from "@/src/context/layerContext";
import { ViewContext } from "@/src/context/viewContext";
import { ZoomContext } from "@/src/context/zoomContext";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import MapControlls from "./MapControlls";

const getSeasonIcon = (season: string) => {
	const colors = {
		spring: "#77DD77", // Soft Green
		summer: "#FFA500", // Bright Orange
		autumn: "#D2691E", // Warm Brown
		winter: "#1E90FF", // Cool Blue
	};

	const color = colors[season as keyof typeof colors] || "black"; // Default to black if no season

	// Encode the SVG as a Data URI
	const svg = encodeURIComponent(`
	  <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M89 35C89 48.8071 77.8071 60 64 60C50.1929 60 39 48.8071 39 35C39 21.1929 50.1929 10 64 10C77.8071 10 89 21.1929 89 35Z" stroke="${color}" stroke-width="20"/>
		<path d="M63.8919 62.8992L97 45L82.2069 81.4277L64.6545 128L31 45L63.8919 62.8992Z" fill="${color}"/>
	  </svg>
	`);

	return new Icon({
		iconUrl: `data:image/svg+xml,${svg}`, // Embed the SVG as a URL
		iconSize: [38, 38],
	});
};
export default function Map({ markers }: { markers: MarkerType[] }) {
	const { coords } = useContext(ViewContext);
	const { zoom } = useContext(ZoomContext);
	const router = useRouter();
	const { layerType } = useContext(LayerContext);

	const dayMap = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const nightMap =
		"https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

	return (
		<>
			{/* <script
				src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
				integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
			></script> */}
			<MapContainer
				className="h-screen w-screen"
				center={[coords.lattitude, coords.longitude]}
				zoom={zoom}
				scrollWheelZoom={true}
				worldCopyJump={true}
			>
				<MapControlls />
				<TileLayer url={layerType ? dayMap : nightMap} />
				{markers.map((marker) => {
					return (
						<Marker
							key={marker.id}
							position={[
								marker.coordinates.latitude,
								marker.coordinates.longitude,
							]}
							icon={getSeasonIcon(marker.season)}
							eventHandlers={{
								click: () => {
									router.push(`/map/${marker.id}`);
								},
							}}
						>
							<Tooltip>{marker.title}</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</>
	);
}
