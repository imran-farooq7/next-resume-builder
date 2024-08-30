"use client";
import Basic from "@/components/Basic";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import SubscribeUser from "@/components/Subscribe-user";
import { useFormState } from "@/Context/FormContext";

const ProfilePage = () => {
	let content = null;
	const context = useFormState();

	if (context?.step === 0) {
		content = <Basic />;
	}
	if (context?.step === 1) {
		content = <Education />;
	}
	if (context?.step === 2) {
		content = <Skills />;
	}
	if (context?.step === 3) {
		content = <Experience />;
	}
	return (
		<div className="mt-10">
			<SubscribeUser />
			<div className="flex gap-20 mt-8">
				<p
					className={`font-bold text-2xl  ${
						context?.step === 0 ? "text-emerald-400" : "text-gray-800"
					}`}
				>
					Basic
				</p>
				<p
					className={`font-bold text-2xl  ${
						context?.step === 1 ? "text-emerald-400" : "text-gray-800"
					}`}
				>
					Education
				</p>
				<p
					className={`font-bold text-2xl  ${
						context?.step === 2 ? "text-emerald-400" : "text-gray-800"
					}`}
				>
					Skills
				</p>
				<p
					className={`font-bold text-2xl  ${
						context?.step === 3 ? "text-emerald-400" : "text-gray-800"
					}`}
				>
					Experience
				</p>
			</div>
			<div className="mt-10">{content}</div>
		</div>
	);
};

export default ProfilePage;
