"use client";
import { createContext, useState } from "react";

interface LayerContextProps {
	layerType: string;
	setLayerType: (sortType: string) => void;
}
const LayerContextPropsDefault: LayerContextProps = {
	layerType: "satelite",
	setLayerType: () => {},
};
const LayerContext = createContext<LayerContextProps>(LayerContextPropsDefault);

interface LayerProviderProps {
	children: React.ReactNode; // Add this line
}

const LayerProvider: React.FC<LayerProviderProps> = ({ children }) => {
	const [layerType, setLayerType] = useState("satelite");

	return (
		<LayerContext.Provider value={{ layerType, setLayerType }}>
			{children}
		</LayerContext.Provider>
	);
};

export { LayerContext, LayerProvider };
