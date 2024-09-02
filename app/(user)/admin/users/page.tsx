import UsersTable from "@/components/UsersTable";
import { getAllUsers } from "@/lib/actions";
import { User } from "@prisma/client";

const UsersPage = async () => {
	const users = await getAllUsers();
	return (
		<div>
			<h1 className="text-3xl text-emerald-400 font-bold mb-4">Users</h1>
			<UsersTable users={users! as User[]} />
		</div>
	);
};

export default UsersPage;
