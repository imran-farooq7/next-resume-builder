"use client";
import Basic from "@/components/Basic";
import { useFormState } from "@/Context/FormContext";

const ProfilePage = () => {
	let content = null;
	const { step } = useFormState();
	if (step === 0) {
		content = <Basic />;
	}
	return (
		<div className="mt-10">
			<h1 className=" text-3xl font-bold text-blue-800">Profile</h1>
			<div className="flex gap-20 mt-8">
				<p className={`font-bold text-2xl ${step === 0 && "text-blue-700"}`}>
					Basic
				</p>
				<p className="font-bold text-2xl">Edcation</p>
				<p className="font-bold text-2xl">Experience</p>
				<p className="font-bold text-2xl">Skills</p>
			</div>
			<div className="mt-10">{content}</div>
		</div>
	);
};

export default ProfilePage;
