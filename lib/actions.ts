"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { Template } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateUser = async (resumeProfile: any) => {
	const session = await auth();
	if (!session) {
		return redirect("/login");
	}
	try {
		const updatedUser = await prisma.user.update({
			where: {
				email: session?.user?.email!,
			},
			data: {
				resumeProfile: resumeProfile,
			},
		});
		if (updatedUser) {
			return {
				status: "success",
				message: "Profile updated successfully",
			};
		}
	} catch (error) {
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
export const createTemplate = async (template: any) => {
	try {
		const createdTemplate = await prisma.template.create({
			data: {
				name: template.name,
				html: template.html,
				isPaid: template.isPaid,
				thumbnail: template.thumbnail,
			},
		});
		if (createdTemplate) {
			return {
				status: "success",
				message: "Template created successfully",
			};
		}
	} catch (error) {
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
export const getTemplates = async () => {
	try {
		const templates = await prisma.template.findMany();
		return templates;
	} catch (error) {
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
export const deleteTemplate = async (id: string) => {
	try {
		const deletedTemplate = await prisma.template.delete({
			where: {
				id: id,
			},
		});
		revalidatePath("/admin/templates");
		return {
			status: "success",
			message: "Template deleted successfully",
		};
	} catch (error) {
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
