import configPromise from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";
import MapRoom from "./MapRoom";

export default async function Page() {
	const payload = await getPayload({ config: configPromise });

	const markers = await payload.find({
		collection: "markers",
		depth: 1,
		limit: 200,
		overrideAccess: false,
		select: {
			title: true,
			coordinates: true,
			updatedAt: true,
			createdAt: true,
		},
	});

	return (
		<>
			<MapRoom markers={markers.docs} />
		</>
	);
}
export function generateMetadata(): Metadata {
	return {
		title: `Payload Website Template Posts`,
	};
}
