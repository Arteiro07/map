import configPromise from "@payload-config";
import { Metadata } from "next";
import { getPayload } from "payload";

export default async function Page() {
	const payload = await getPayload({ config: configPromise });

	const posts = await payload.find({
		collection: "posts",
		depth: 1,
		limit: 12,
		overrideAccess: false,
		select: {
			title: true,
		},
	});
	console.log(posts);

	return (
		<>
			<div className="pt-24 pb-24">
				<div className="container mb-16">
					<div className="prose dark:prose-invert max-w-none">
						<h1>Posts</h1>
					</div>
				</div>
				<>
					{posts.docs.map((post) => (
						<div className="container mb-8" key={post.id}>
							<div className="prose dark:prose-invert max-w-none">
								<h2>{post.title}</h2>
							</div>
						</div>
					))}
				</>
				<div className="container mb-8"></div>
			</div>
		</>
	);
}
export function generateMetadata(): Metadata {
	return {
		title: `Payload Website Template Posts`,
	};
}
