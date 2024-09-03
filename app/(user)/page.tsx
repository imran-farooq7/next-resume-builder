import { prisma } from "@/prisma/prisma";
import Link from "next/link";

const HomePage = async () => {
	const templates = await prisma.template.findMany();
	return (
		<div>
			<h1 className="text-3xl text-emerald-400 font-bold">Templates</h1>
			<p>Choose the template you like</p>
			<div className="mt-6 grid grid-cols-5 gap-10">
				{templates.map((template) => (
					<Link
						href={`/template/${template.id}`}
						key={template.id}
						className="border border-emerald-300 hover:scale-105 transition-all ease-in-out border-solid"
					>
						<img
							src={template.thumbnail}
							alt={template.name}
							className="object-cover w-full h-full"
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default HomePage;
