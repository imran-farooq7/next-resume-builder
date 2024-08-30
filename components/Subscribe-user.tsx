"use client";
import Loading from "@/app/(user)/loading";
import { createPaymentIntent, getUniqueUser } from "@/lib/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubscribeUser = () => {
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User>();
	useEffect(() => {
		const getUser = async () => {
			setLoading(true);
			const user = await getUniqueUser();
			setUser(user!);
			setLoading(false);
		};
		getUser();
	}, []);
	const getClientSecret = async () => {
		try {
			setLoading(true);
			const res = await createPaymentIntent();
			if (res.status === "success") {
				setClientSecret(res.data!);
				console.log(res.data);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (user && user?.subscription === undefined) {
		return <h1 className="text-emerald-500 font-bold">You are a subscriber</h1>;
	}

	return (
		<div className="flex justify-between items-center">
			<h1 className="text-red-500 font-bold">You are not a subscribed user</h1>
			<button
				onClick={getClientSecret}
				disabled={loading}
				className="bg-emerald-400 text-white py-3 px-6 rounded-lg hover:scale-105 transition-all ease-in-out disabled:opacity-50"
			>
				Subscribe Now <span className="font-bold">5$</span>
			</button>
		</div>
	);
};

export default SubscribeUser;
