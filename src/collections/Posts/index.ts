import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields";
import { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
	slug: "posts",
	access: {
		read: () => true,
	},
	// defaultPopulate: {
	// 	title: true,
	// 	slug: true,
	// 	categories: true,
	// 	meta: {
	// 		image: true,
	// 		description: true,
	// 	},
	// },
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "heroImage",
							type: "upload",
							relationTo: "media",
						},
						{
							name: "content",
							type: "richText",
							label: false,
							required: true,
						},
					],
					label: "Content",
				},
				{
					fields: [
						{
							name: "relatedPosts",
							type: "relationship",
							admin: {
								position: "sidebar",
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id],
									},
								};
							},
							hasMany: true,
							relationTo: "posts",
						},
					],
					label: "Meta",
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),
						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,
							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
	],
};
