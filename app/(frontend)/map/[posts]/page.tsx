import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Page({ params }: { params: { posts: string } }) {
	const payload = await getPayload({ config: configPromise });
	const { posts } = await params;
	const marker = await payload.findByID({
		collection: "markers",
		id: posts,
		overrideAccess: false,
		select: {
			title: true,
			coordinates: true,
			updatedAt: true,
			createdAt: true,
			rating: true,
			year: true,
			season: true,
			duration: true,
			company: true,
			post: true,
		},
	});

	console.log(marker.post);
	return (
		<>
			hello darkness my old friend
			{marker.title}
			{marker.coordinates.latitude}
			{marker.coordinates.longitude}
			{marker.updatedAt}
			{marker.createdAt}
			{marker.rating}
			{marker.year}
			{marker.season}
			{marker.duration}
			{marker.company}
			{/* {marker.post} */}
		</>
	);
}
