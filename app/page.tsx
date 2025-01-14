"use client";
import { Icon, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Home() {
	const position = [38.7071, -9.1354] as [number, number];
	interface Location {
		geocode: LatLngTuple;
		popup: string;
	}

	const locations: Location[] = [
		{ geocode: [38.6071, -9.1354], popup: "João?" },
		{
			geocode: [38.8071, -9.1354],
			popup: "que",
		},
		{
			geocode: [38.7071, -9.2354],
			popup: "O",
		},
		{
			geocode: [38.7071, -9.0354],
			popup: "achas",
		},
	];

	const customIcon = new Icon({
		iconUrl: "map_icon.svg",
		iconSize: [38, 38],
	});

	return (
		<MapContainer
			className="h-screen w-screen"
			center={position}
			zoom={11}
			scrollWheelZoom={true}
		>
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
						<Popup>{location.popup}</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
}
