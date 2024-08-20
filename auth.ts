import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [github],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
});
