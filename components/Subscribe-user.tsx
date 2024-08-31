"use client";
import Loading from "@/app/(user)/loading";
import { createPaymentIntent, getUniqueUser } from "@/lib/actions";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const SubscribeUser = () => {
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

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
				setOpen(true);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const options: StripeElementsOptions = {
		clientSecret: clientSecret,
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
			{clientSecret && (
				<Elements stripe={stripePromise} options={options}>
					<CheckoutForm open={open} setOpen={setOpen} />
				</Elements>
			)}
		</div>
	);
};

export default SubscribeUser;
