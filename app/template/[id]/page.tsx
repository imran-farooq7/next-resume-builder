import { auth } from "@/auth";
import Resume from "@/components/Resume";
import { getTemplateById } from "@/lib/actions";
import { prisma } from "@/prisma/prisma";
import { Template } from "@prisma/client";
import Link from "next/link";

interface Props {
	params: {
		id: string;
	};
}
const TemplatePreview = async ({ params: { id } }: Props) => {
	const session = await auth();
	const template = await getTemplateById(id);
	const userProfile = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
			role: "user",
		},
		select: {
			resumeProfile: true,
		},
	});
	return (
		<div className="flex flex-col">
			<div className="flex gap-4 justify-center mt-5">
				<Link
					href={"/"}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Back to Templates
				</Link>
				<button
					type="submit"
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Print
				</button>
			</div>
			<Resume
				template={template as Template}
				userProfile={userProfile?.resumeProfile!}
			/>
		</div>
	);
};

export default TemplatePreview;
