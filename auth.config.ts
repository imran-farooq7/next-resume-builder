import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
	providers: [],
	pages: {
		signIn: "/login",
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnHome = nextUrl.pathname.startsWith("/");
			if (isOnHome && !isLoggedIn) {
				return false;
			} else if (nextUrl.pathname === "/login" && isLoggedIn) {
				return NextResponse.redirect(new URL("/", nextUrl));
			}
			return true;
		},
	},
} satisfies NextAuthConfig;
