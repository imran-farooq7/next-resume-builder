import { auth } from "@/auth";

const TemplatesPage = async () => {
	const session = await auth();
	if (
		//@ts-ignore
		session?.user?.role !== "admin"
	) {
		return (
			<div className="h-screen flex items-center justify-center">
				<p className="text-emerald-400 font-bold text-4xl">
					You are not authorized to access this page
				</p>
			</div>
		);
	}
	return <div>templates</div>;
};

export default TemplatesPage;
