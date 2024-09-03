import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export const uploadThumbnail = async (file: File) => {
	const { data, error } = await supabase.storage
		.from("thumbnails")
		.upload(`public/${file.name}`, file, {
			contentType: "image/png",
		});
	if (error) {
		console.log(error.message);
	} else {
		const thumbnailUrl = await getThumbnailUrl(data.path);
		return thumbnailUrl;
	}
};

const getThumbnailUrl = async (path: string) => {
	const { data } = await supabase.storage.from("thumbnails").getPublicUrl(path);
	return data.publicUrl;
};
