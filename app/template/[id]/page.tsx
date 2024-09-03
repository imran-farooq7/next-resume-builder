import { auth } from "@/auth";
import Resume from "@/components/Resume";
import { getTemplateById } from "@/lib/actions";
import { prisma } from "@/prisma/prisma";
import { Template } from "@prisma/client";

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
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
	});
	return (
		<Resume
			template={template as Template}
			userProfile={userProfile?.resumeProfile!}
			user={user!}
		/>
	);
};

export default TemplatePreview;
