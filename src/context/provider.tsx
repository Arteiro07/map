import { Marker as MarkerType } from "@/payload-types";
import { FilterProvider } from "./filterContext";

import { LayerProvider } from "./layerContext";
import { MapProvider } from "./mapContext";
import { SortProvider } from "./sortContext";
import { ViewProvider } from "./viewContext";
import { ZoomProvider } from "./zoomContext";

type props = {
	markers: MarkerType[];
	children: React.ReactNode;
};

export default function ContextProvider({ markers, children }: props) {
	return (
		<>
			<FilterProvider markers={markers}>
				<LayerProvider>
					<SortProvider>
						<ZoomProvider>
							<ViewProvider>
								<MapProvider>{children}</MapProvider>
							</ViewProvider>
						</ZoomProvider>
					</SortProvider>
				</LayerProvider>
			</FilterProvider>
		</>
	);
}
