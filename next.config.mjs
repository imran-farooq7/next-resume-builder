/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "avatars.githubusercontent.com",
			},
			{
				hostname: "zvrfgeivsvehskwmrkmz.supabase.co",
			},
		],
	},
};

export default nextConfig;
