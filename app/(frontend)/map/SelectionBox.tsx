import { useState } from "react";

export default function SelectionBox() {
	const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

	const subOptions = {
		Year: ["2024", "2023", "2022", "2021"],
		Season: ["Spring", "Summer", "Autumn", "Winter"],
		Company: ["Company A", "Company B", "Company C"],
	};

	return (
		<div className="absolute top-4 right-4 bg-gray-600 p-3 rounded shadow-lg z-[1000]">
			<div>
				<label>Filter:</label>
				<select
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					onChange={(e) => setSelectedFilter(e.target.value)}
				>
					<option>Year</option>
					<option>Season</option>
					<option>Company</option>
				</select>
			</div>
			{/* Show sub-options if a filter is selected */}
			{selectedFilter && (
				<div className="mt-3">
					<label className="text-white">{selectedFilter}:</label>
					<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option value="">Select {selectedFilter}</option>
						{subOptions[selectedFilter as keyof typeof subOptions].map(
							(option) => (
								<option key={option} value={option}>
									{option}
								</option>
							)
						)}
					</select>
				</div>
			)}
			<div>
				<label>Sort:</label>
				<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option>Rating</option>
					<option>Duration</option>
				</select>
			</div>
			<label>Base Layer</label>
			<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
				<option>None</option>
				<option>OpenStreetMap</option>
			</select>
		</div>
	);
}
