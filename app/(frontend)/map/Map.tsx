"use client";
import { Marker as MarkerType } from "@/payload-types";
import { Icon, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import ZoomControlls from "./ZoomControlls";

export default function Map({ markers }: { markers: MarkerType[] }) {
	const startingPosition = [38.7071, -9.1354] as [number, number];
	interface Location {
		geocode: LatLngTuple;
		popup: string;
	}
	console.log("cahskhaj");
	console.log(markers);

	const locations: Location[] = markers.map((marker) => ({
		geocode: [marker.coordinates.latitude, marker.coordinates.longitude],
		popup: marker.title,
	}));

	const customIcon = new Icon({
		iconUrl: "map_icon.svg",
		iconSize: [38, 38],
	});

	return (
		<>
			<script
				src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
				integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
			></script>
			<MapContainer
				className="h-screen w-screen"
				center={startingPosition}
				zoom={11}
				scrollWheelZoom={true}
			>
				<ZoomControlls />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{locations.map((location) => {
					return (
						<Marker
							key={location.geocode.toString()}
							position={location.geocode}
							icon={customIcon}
						>
							<Tooltip>{location.popup}</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</>
	);
}
