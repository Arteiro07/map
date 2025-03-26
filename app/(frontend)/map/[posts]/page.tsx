import configPromise from "@payload-config";
import { getPayload } from "payload";

type Params = Promise<{ posts: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const payload = await getPayload({ config: configPromise });
	const params = await props.params;

	const posts = Number(params.posts);

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
