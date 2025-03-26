import { Marker as MarkerType } from "@/payload-types";
import { FilterContext } from "@/src/context/filterContext";
import { LayerContext } from "@/src/context/layerContext";
import { SortContext } from "@/src/context/sortContext";
import { useContext, useState } from "react";

export default function SelectionBox({ markers }: { markers: MarkerType[] }) {
	const { setSortType } = useContext(SortContext);
	const { setFilter } = useContext(FilterContext);
	const { layerType, setLayerType } = useContext(LayerContext);
	const [showYears, setShowYears] = useState(false);
	const [showSeasons, setShowSeasons] = useState(false);
	const [showCompany, setShowCompany] = useState(false);

	return (
		<div className="absolute top-4 right-4 bg-gray-600 p-3 rounded shadow-lg z-[1000]">
			<div>Filter:</div>
			<div>
				<button
					className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 items-center justify-between"
					onClick={() => setShowYears(!showYears)}
				>
					Years:
					<span
						className={`inline-block transform transition-transform ${showYears ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				{showYears && (
					<MultiSelectCheckbox
						name="year"
						options={[
							...new Set(markers.map((marker) => marker.year.toString())),
						].sort((a, b) => parseInt(a) - parseInt(b))}
					/>
				)}
			</div>
			<div>
				<button
					className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 items-center justify-between"
					onClick={() => setShowSeasons(!showSeasons)}
				>
					Seasons:
					<span
						className={`inline-block transform transition-transform ${showSeasons ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				{showSeasons && (
					<MultiSelectCheckbox
						name="season"
						options={[...new Set(markers.map((marker) => marker.season))]}
					/>
				)}
			</div>
			<div>
				<button
					className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 items-center justify-between"
					onClick={() => setShowCompany(!showCompany)}
				>
					Company:
					<span
						className={`inline-block transform transition-transform ${showCompany ? "rotate-180" : "rotate-0"}`}
					>
						▼
					</span>
				</button>
				{showCompany && (
					<MultiSelectCheckbox
						name="company"
						options={[...new Set(markers.map((marker) => marker.company))]}
					/>
				)}
			</div>

			<div>
				<label>Sort:</label>
				<select
					onChange={(e) => {
						setSortType(e.target.value);
					}}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				>
					<option value={"rating"}>Rating</option>
					<option value={"duration"}>Duration</option>
				</select>
			</div>
			<label>Base Layer:</label>
			<select
				onChange={(e) => {
					setLayerType(e.target.value);
				}}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			>
				<option value={"day"}>Day</option>
				<option value={"night"}>Night</option>
			</select>
		</div>
	);
}

interface MultiSelectCheckboxProps {
	name: "year" | "season" | "company"; // ✅ Explicitly define valid filter keys
	options: string[];
}
const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({
	name,
	options,
}) => {
	const { filter, setFilter } = useContext(FilterContext);

	const toggleFilter = (value: string) => {
		setFilter((prev) => ({
			...prev,
			[name]: (prev[name] as string[]).includes(value) // ✅ No more TypeScript error!
				? prev[name].filter((v) => v !== value) // Remove selection
				: [...prev[name], value], // Add selection
		}));
	};

	return (
		<div className="flex-wrap">
			{options.map((option) => (
				<button
					key={option}
					onClick={() => toggleFilter(option)}
					className={`border rounded bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full pb-2.5 pt-2.5 ${
						(filter[name] as string[]).includes(option)
							? "bg-gray-900 text-white"
							: " dark:bg-gray-700"
					}`}
				>
					{(filter[name] as string[]).includes(option) ? "✅" : "⬜"} {option}
				</button>
			))}
		</div>
	);
};
