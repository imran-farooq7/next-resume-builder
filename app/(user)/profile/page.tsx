"use client";
import Basic from "@/components/Basic";
import Education from "@/components/Education";
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
	return (
		<div className="mt-10">
			<div className="flex gap-20 mt-8">
				<p
					className={`font-bold text-2xl text-gray-800 ${
						context?.step === 0 && "text-blue-700"
					}`}
				>
					Basic
				</p>
				<p
					className={`font-bold text-2xl text-gray-800 ${
						context?.step === 1 && "text-blue-700"
					}`}
				>
					Education
				</p>
				<p className="font-bold text-2xl text-gray-800">Skills</p>
				<p className="font-bold text-2xl text-gray-800">Experience</p>
			</div>
			<div className="mt-10">{content}</div>
		</div>
	);
};

export default ProfilePage;
