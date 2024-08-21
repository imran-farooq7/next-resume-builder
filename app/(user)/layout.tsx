import Container from "@/components/Container";
import Navbar from "@/components/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			<Container>{children}</Container>
		</div>
	);
};

export default UserLayout;
