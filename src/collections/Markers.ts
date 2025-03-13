import type { CollectionConfig } from "payload";

export const Markers: CollectionConfig = {
	slug: "markers",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "year",
			type: "number",
			required: true,
		},
		{
			name: "season",
			type: "select",
			options: [
				{
					label: "Winter",
					value: "winter",
				},
				{
					label: "Spring",
					value: "spring",
				},
				{
					label: "Summer",
					value: "summer",
				},
				{
					label: "Fall",
					value: "fall",
				},
			],
			required: true,
		},
		{
			name: "rating",
			type: "number",
			max: 10,
			min: 0,
			required: true,
		},
		{
			name: "Duration/days",
			type: "number",
			max: 365,
			min: 1,
		},
		{
			name: "Family/Alone/Friends",
			type: "select",
			options: [
				{
					label: "Family",
					value: "family",
				},
				{
					label: "Alone",
					value: "alone",
				},
				{
					label: "Friends",
					value: "friends",
				},
			],
		},

		{
			name: "coordinates",
			type: "group",
			fields: [
				{
					name: "latitude",
					type: "number",
					required: true,
				},
				{
					name: "longitude",
					type: "number",
					required: true,
				},
			],
		},
	],
};
