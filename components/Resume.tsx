"use client";
import { Template, User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import Mustache from "mustache";
import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
interface Props {
	template: Template;
	userProfile: JsonValue;
	user: User;
}

const Resume = ({ template, userProfile, user }: Props) => {
	if (!userProfile) {
		return (
			<div className="h-screen flex justify-center items-center">
				<h1 className="text-5xl text-emerald-500">Profile does not exist</h1>
			</div>
		);
	}
	const componentRef = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	let printIt = false;
	if (template.isPaid && user.subscription !== null) {
		printIt = true;
	}
	if (template.isPaid && user.subscription === null) {
		printIt = false;
	}
	if (!template.isPaid) {
		printIt = true;
	}
	const html = Mustache.render(template.html, userProfile);
	return (
		<div>
			<div className="flex gap-4 justify-center my-5">
				<Link
					href={"/"}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Back to Templates
				</Link>
				{printIt && (
					<button
						onClick={handlePrint}
						className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
					>
						Print
					</button>
				)}
			</div>
			{!printIt && (
				<div className="text-red-600 text-center mb-4">
					You have to be a paid subscriber in order to print or save this
					template. Please buy the subscription
				</div>
			)}
			<div
				dangerouslySetInnerHTML={{ __html: html }}
				// className="my-10"
				ref={componentRef}
			></div>
		</div>
	);
};

export default Resume;
