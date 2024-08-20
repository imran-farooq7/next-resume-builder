import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";
import { prisma } from "./prisma/prisma";

export const authConfig = {
	adapter: PrismaAdapter(prisma),

	providers: [github],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnHome = nextUrl.pathname.startsWith("/");
			if (isOnHome) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
