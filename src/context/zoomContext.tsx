"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ZoomContextProps {
	zoom: number;
	setZoom: Dispatch<SetStateAction<number>>;
}
const ZoomContextPropsDefault: ZoomContextProps = {
	zoom: 0,
	setZoom: () => {},
};
const ZoomContext = createContext<ZoomContextProps>(ZoomContextPropsDefault);

interface ZoomProviderProps {
	children: React.ReactNode; // Add this line
}

const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
	const [zoom, setZoom] = useState(3);

	return (
		<ZoomContext.Provider value={{ zoom, setZoom }}>
			{children}
		</ZoomContext.Provider>
	);
};

export { ZoomContext, ZoomProvider };
