"use client";
import { createContext, useState } from "react";

interface MapContextProps {
	isGlobe: boolean;
	setIsGlobe: (isVisible: boolean) => void;
}
const MapContextPropsDefault: MapContextProps = {
	isGlobe: false,
	setIsGlobe: () => {},
};
const MapContext = createContext<MapContextProps>(MapContextPropsDefault);

interface MapProviderProps {
	children: React.ReactNode; // Add this line
}

const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
	const [isGlobe, setIsGlobe] = useState(false);

	return (
		<MapContext.Provider value={{ isGlobe, setIsGlobe }}>
			{children}
		</MapContext.Provider>
	);
};

export { MapContext, MapProvider };
