import type { CollectionConfig } from "payload";

export const Markers: CollectionConfig = {
	slug: "markers",
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "coordinates",
			type: "text",
			required: true,
		},
	],
	upload: true,
};
