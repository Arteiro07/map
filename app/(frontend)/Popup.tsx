import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PopupProps {
	message: string;
	id: number;
}

export default function Popup(propz: PopupProps) {
	return (
		<div className="fixed flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 roundedtransition-opacity duration-500">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full text-center transition-opacity animate-fadeIn">
				<Link href={`/map/${propz.id}`} passHref>
					<button className="mt-4 px-2 py-1 bg-gray-600 text-white font-small rounded-lg shadow-md transition hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2">
						Read more <ArrowRight className="w-4 h-4" />
					</button>
				</Link>
				<p className="text-gray-900 dark:text-white">{propz.message}</p>
			</div>
		</div>
	);
}
