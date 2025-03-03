"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import Users from "./Users";

export default function Home() {
	return (
		<>
			<Link href="/map">MAPS</Link>
			<Users />
		</>
	);
}
