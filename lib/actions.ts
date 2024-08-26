"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
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
		throw new Error("User not found");
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
