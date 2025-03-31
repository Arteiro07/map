"use client";
import { Marker as MarkerType } from "@/payload-types";
import { FilterContext } from "@/src/context/filterContext";
import { MapContext } from "@/src/context/mapContext";
import ContextProvider from "@/src/context/provider";
import dynamic from "next/dynamic";
import { useContext, useEffect, useRef, useState } from "react";
import FiberCanvas from "./FiberCanvas";
import Popup from "./Popup";
//import SelectionBox from "./SelectionBox";
const SelectionBox = dynamic(() => import("./SelectionBox"), { ssr: false });

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapRoom({ markers }: { markers: MarkerType[] }) {
	const [videoEnded, setVideoEnded] = useState(false);
	const [hasPlayed, setHasPlayed] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	return (
		<>
			{!videoEnded && (
				<div className="relative w-full h-full">
					<video
						ref={videoRef}
						onPlay={() => setHasPlayed(true)}
						onEnded={() => setVideoEnded(true)}
						width={1920}
						height={1080}
						autoPlay
						className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
							videoEnded ? "opacity-0" : "opacity-100"
						}`}
					>
						<source src="/0001-0120.webm" type="video/webm" />
						Your browser does not support the video tag.
					</video>

					{/* Custom play button overlay */}
					{!hasPlayed && (
						<button
							onClick={() => videoRef.current?.play()}
							className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                       bg-black/50 text-white rounded-full p-4 hover:bg-black/75 transition-colors
                                       backdrop-blur-sm"
						>
							<svg className="w-44 h-44" viewBox="0 0 24 24">
								<path fill="currentColor" d="M8 5v14l11-7z" />
							</svg>
						</button>
					)}
				</div>
			)}
			<div
				className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out 
				${videoEnded ? "pointer-events-auto" : "pointer-events-none"}
				${videoEnded ? "opacity-100" : "opacity-0"}`}
			>
				<ContextProvider markers={markers}>
					<SelectionBox markers={markers} />
					<MapDecider markers={markers} />
				</ContextProvider>
			</div>
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
	}, [markers, filter]);

	return (
		<>
			<>
				<Popup />
				{isGlobe && <FiberCanvas markers={filteredMarkers} />}
				{!isGlobe && <Map markers={filteredMarkers} />}
			</>
		</>
	);
}
