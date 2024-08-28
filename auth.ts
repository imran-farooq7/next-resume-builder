import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		Github({
			profile(profile) {
				return {
					role: profile.role ?? "user",
					id: String(profile.id),
					email: profile.email,
					image: profile.avatar_url,
					name: profile.name,
				};
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			// @ts-ignore
			if (user) token.role = user.role;
			return token;
		},
		session({ session, token }) {
			// @ts-ignore
			session.user.role = token.role;
			return session;
		},
	},

	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
});
