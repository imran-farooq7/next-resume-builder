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
		<Resume
			template={template as Template}
			userProfile={userProfile?.resumeProfile!}
		/>
	);
};

export default TemplatePreview;
