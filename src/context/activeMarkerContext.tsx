"use client";
import { Marker as MarkerType } from "@/payload-types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ActiveMarkerContextProps {
	marker: MarkerType | null;
	setActiveMarker: Dispatch<SetStateAction<MarkerType | null>>;
}

const activeMarkerContextPropsDefault: ActiveMarkerContextProps = {
	marker: null,
	setActiveMarker: () => {},
};
const ActiveMarkerContext = createContext<ActiveMarkerContextProps>(
	activeMarkerContextPropsDefault
);

interface ActiveMarkerProviderProps {
	children: React.ReactNode; // Add this line
}

const ActiveMarkerProvider: React.FC<ActiveMarkerProviderProps> = ({
	children,
}) => {
	const [marker, setActiveMarker] = useState<MarkerType | null>(null);

	return (
		<ActiveMarkerContext.Provider value={{ marker, setActiveMarker }}>
			{children}
		</ActiveMarkerContext.Provider>
	);
};

export { ActiveMarkerContext, ActiveMarkerProvider };
