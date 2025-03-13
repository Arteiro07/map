//zoom
//coordinates
"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface ViewContextProps {
	coords: { lattitude: number; longitude: number };
	setCoords: Dispatch<SetStateAction<{ lattitude: number; longitude: number }>>;
}
const viewContextPropsDefault: ViewContextProps = {
	coords: { lattitude: 38.7071, longitude: -9.1354 },
	setCoords: () => {},
};
const ViewContext = createContext<ViewContextProps>(viewContextPropsDefault);

interface ViewProviderProps {
	children: React.ReactNode; // Add this line
}

const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
	const [coords, setCoords] = useState({
		lattitude: 38.7071,
		longitude: -9.1354,
	});

	return (
		<ViewContext.Provider value={{ coords, setCoords }}>
			{children}
		</ViewContext.Provider>
	);
};

export { ViewContext, ViewProvider };
