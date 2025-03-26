"use client";
import { Marker as MarkerType } from "@/payload-types";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface FilterState {
	year: string[];
	season: ("winter" | "spring" | "summer" | "fall")[];
	company: ("family" | "alone" | "friends")[];
}

interface FilterContextProps {
	filter: FilterState;
	setFilter: Dispatch<SetStateAction<FilterState>>;
}

const FilterContextPropsDefault: FilterContextProps = {
	filter: {
		year: [],
		season: [],
		company: [],
	},
	setFilter: () => {},
};
const FilterContext = createContext<FilterContextProps>(
	FilterContextPropsDefault
);

interface FilterProviderProps {
	children: React.ReactNode;
	markers: MarkerType[];
}

const FilterProvider: React.FC<FilterProviderProps> = ({
	children,
	markers,
}) => {
	const [filter, setFilter] = useState({
		year: Array.from(new Set(markers.map((marker) => marker.year.toString()))),
		season: Array.from(new Set(markers.map((marker) => marker.season))),
		company: Array.from(new Set(markers.map((marker) => marker.company))),
	});

	return (
		<FilterContext.Provider value={{ filter, setFilter }}>
			{children}
		</FilterContext.Provider>
	);
};

export { FilterContext, FilterProvider };
