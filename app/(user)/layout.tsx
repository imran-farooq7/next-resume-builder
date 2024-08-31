import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import FormProvider from "@/Context/FormContext";
import { SessionProvider } from "next-auth/react";

export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<FormProvider>
				<Navbar />
				<Container>{children}</Container>
			</FormProvider>
		</SessionProvider>
	);
}
