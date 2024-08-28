import { auth } from "@/auth";
import TemplatesTable from "@/components/TemplatesTable";
import { prisma } from "@/prisma/prisma";
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
	const templates = await prisma.template.findMany();
	return (
		<div className="mt-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-emerald-400 font-bold text-2xl">All Templates</h1>
				<Link
					href={"/admin/templates/new"}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					New Template
				</Link>
			</div>
			<TemplatesTable templates={templates} />
		</div>
	);
};

export default TemplatesPage;
