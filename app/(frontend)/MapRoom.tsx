"use client";
import { Marker as MarkerType } from "@/payload-types";
import { FilterContext } from "@/src/context/filterContext";
import { MapContext } from "@/src/context/mapContext";
import ContextProvider from "@/src/context/provider";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import FiberCanvas from "./FiberCanvas";
import SelectionBox from "./SelectionBox";
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapRoom({ markers }: { markers: MarkerType[] }) {
	return (
		<>
			<ContextProvider markers={markers}>
				<SelectionBox markers={markers} />
				<MapDecider markers={markers} />
			</ContextProvider>
		</>
	);
}

function MapDecider({ markers }: { markers: MarkerType[] }) {
	const { isGlobe } = useContext(MapContext);
	const { filter } = useContext(FilterContext);
	const [filteredMarkers, setFilteredMarkers] = useState<MarkerType[]>(markers);

	useEffect(() => {
		const auxMarkers = markers.filter((marker) => {
			return (
				filter.year?.length &&
				filter.year.includes(marker.year.toString()) &&
				filter.season?.length &&
				filter.season.includes(marker.season) &&
				filter.company?.length &&
				filter.company.includes(marker.company)
			);
		});
		setFilteredMarkers(auxMarkers);
	}, [filter]);

	return (
		<>
			{isGlobe && <FiberCanvas markers={filteredMarkers} />}
			{!isGlobe && <Map markers={filteredMarkers} />}
		</>
	);
}
