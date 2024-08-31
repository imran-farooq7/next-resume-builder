import { auth } from "@/auth";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import FormProvider from "@/Context/FormContext";
import { SessionProvider } from "next-auth/react";

export default async function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<FormProvider>
			<Navbar user={session?.user!} />
			<Container>{children}</Container>
		</FormProvider>
	);
}
