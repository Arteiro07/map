import { Icon, LatLngTuple } from "leaflet";
import Head from "next/head";
import Script from "next/script";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

export default function Map() {
	const startingPosition = [38.7071, -9.1354] as [number, number];
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
		<>
			<Head>
				{" "}
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
					integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
				/>
			</Head>
			<Script src="https://example.com/script.js" />
			<MapContainer
				className="h-screen w-screen"
				center={startingPosition}
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
							<Tooltip>{location.popup}</Tooltip>
						</Marker>
					);
				})}
			</MapContainer>
		</>
	);
}
