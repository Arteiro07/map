"use client";
import { createContext, useState } from "react";

interface SortContextProps {
	sortType: string;
	setSortType: (sortType: string) => void;
}
const SortContextPropsDefault: SortContextProps = {
	sortType: "rating",
	setSortType: () => {},
};
const SortContext = createContext<SortContextProps>(SortContextPropsDefault);

interface SortProviderProps {
	children: React.ReactNode; // Add this line
}

const SortProvider: React.FC<SortProviderProps> = ({ children }) => {
	const [sortType, setSortType] = useState("rating");

	return (
		<SortContext.Provider value={{ sortType, setSortType }}>
			{children}
		</SortContext.Provider>
	);
};

export { SortContext, SortProvider };
