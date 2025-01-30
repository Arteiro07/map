import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Markers } from "./src/collections/Markers";
import { Media } from "./src/collections/Media";
import { Posts } from "./src/collections/Posts";
import { Users } from "./src/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Posts, Users, Markers, Media],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",

	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	sharp,
	plugins: [
		seoPlugin({
			collections: ["pages"],
			uploadsCollection: "media",
			generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
			generateDescription: ({ doc }) => doc.excerpt,
		}),
		vercelBlobStorage({
			enabled: true, // Optional, defaults to true
			// Specify which collections should use Vercel Blob
			collections: {
				media: true,
			},
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
});
