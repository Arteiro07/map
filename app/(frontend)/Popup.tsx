import { ActiveMarkerContext } from "@/src/context/activeMarkerContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function Popup() {
	const { marker, setActiveMarker } = useContext(ActiveMarkerContext);

	useEffect(() => {
		console.log(marker);
	}, [marker]);
	if (marker === null) return <></>;
	return (
		<div className="absolute top-4 left-4 bg-gray-600 p-3 rounded shadow-lg z-[1000]">
			<div
				className="top-0, right-0, absolute"
				onClick={() => setActiveMarker(null)}
			>
				X
			</div>
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full text-center transition-opacity animate-fadeIn">
				<Link href={`/map/${marker?.id}`} passHref>
					<button className="mt-4 px-2 py-1 bg-gray-600 text-white font-small rounded-lg shadow-md transition hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2">
						Read more <ArrowRight className="w-4 h-4" />
					</button>
				</Link>
				<p className="text-gray-900 dark:text-white">{marker?.title}</p>
			</div>
		</div>
	);
}
