import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
	title: "Next Resume Builder",
	description: "An awesome resume builder for developers",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-screen">
			<body className={poppins.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
