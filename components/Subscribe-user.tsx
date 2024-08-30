import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";

const SubscribeUser = async () => {
	const session = await auth();
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email!,
		},
	});
	if (user?.subscription === undefined) {
		return (
			<h1 className="text-emerald-500 font-bold">You are subscribed user</h1>
		);
	}
	return (
		<div className="flex justify-between items-center">
			<h1 className="text-red-500 font-bold">You are not a subscribed user</h1>
			<button className="bg-emerald-400 text-white py-3 px-6 rounded-lg hover:scale-105 transition-all ease-in-out">
				Subscribe Now <span className="font-bold">5$</span>
			</button>
		</div>
	);
};

export default SubscribeUser;
