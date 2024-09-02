import SubscriptionsTable from "@/components/SubscriptionsTable";
import { getAllSubscriptions } from "@/lib/actions";
import { Subscription } from "@prisma/client";

const SubscriptionsPage = async () => {
	const subscriptions = await getAllSubscriptions();
	return (
		<div>
			<h1 className="text-3xl text-emerald-400 font-bold mb-4">
				Subscriptions
			</h1>
			<SubscriptionsTable subscriptions={subscriptions as Subscription[]} />
		</div>
	);
};

export default SubscriptionsPage;
