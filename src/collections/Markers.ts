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
