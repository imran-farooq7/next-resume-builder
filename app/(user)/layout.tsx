"use client";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import FormProvider from "@/Context/FormContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormProvider>
			<Navbar />
			<Container>{children}</Container>
		</FormProvider>
	);
};

export default Layout;
