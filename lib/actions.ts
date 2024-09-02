"use server";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import stripe from "stripe";

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
export const getTemplateById = async (id: string) => {
	try {
		const template = await prisma.template.findUnique({
			where: {
				id: id,
			},
		});
		return template;
	} catch (error) {
		return {
			status: "error",
			message: "something went wrong",
		};
	}
};
export const createPaymentIntent = async () => {
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

	try {
		const paymentIntent: stripe.PaymentIntent =
			await stripe.paymentIntents.create({
				amount: 500,
				currency: "usd",
			});
		return {
			status: "success",
			data: paymentIntent.client_secret,
		};
	} catch (error: any) {
		return {
			status: "fail",
			message: error.message,
		};
	}
};
export const getUniqueUser = async () => {
	const session = await auth();
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
	});
	return user;
};
export const saveSubscription = async ({
	userId,
	paymentId,
	amount,
}: {
	userId: string;
	paymentId: string;
	amount: number;
}) => {
	try {
		const subscription = await prisma.subscription.create({
			data: {
				userId,
				amount,
				paymentId,
			},
		});
		const updateUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				subscription,
			},
		});
		if (subscription && updateUser) {
			revalidatePath("/profile");
			return {
				status: "success",
				message: "Subscription saved successfully",
			};
		}
	} catch (error) {
		return {
			status: "error",
			message: "Error saving subscription",
		};
	}
};
export const getAllSubscriptions = async () => {
	try {
		const subscriptions = await prisma.subscription.findMany({
			orderBy: {
				id: "asc",
			},
		});
		return subscriptions;
	} catch (error) {
		return {
			status: "error",
			message: "Error getting subscriptions",
		};
	}
};
