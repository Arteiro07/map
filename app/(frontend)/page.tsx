import "leaflet/dist/leaflet.css";
import Users from "./Users";

export default function Home() {
	console.log(process.env.PAYLOAD_SECRET);

	return <Users />;
}
