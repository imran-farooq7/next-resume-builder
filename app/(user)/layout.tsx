import Navbar from "@/components/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default UserLayout;
