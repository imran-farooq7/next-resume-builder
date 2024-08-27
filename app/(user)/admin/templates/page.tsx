import { auth } from "@/auth";
import Link from "next/link";

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
	return (
		<div className="mt-8">
			<div className="flex justify-between items-center">
				<h1 className="text-emerald-400 font-bold text-2xl">All Templates</h1>
				<Link
					href={"/admin/templates/new"}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					New Template
				</Link>
			</div>
		</div>
	);
};

export default TemplatesPage;
