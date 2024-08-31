import { Template } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import Mustache from "mustache";
interface Props {
	template: Template;
	userProfile: JsonValue;
}

const Resume = ({ template, userProfile }: Props) => {
	if (!userProfile) {
		return (
			<div className="h-screen justify-center items-center">
				<h1 className="text-5xl text-emerald-500">Profile does not exist</h1>
			</div>
		);
	}
	const html = Mustache.render(template.html, userProfile);
	return (
		<div dangerouslySetInnerHTML={{ __html: html }} className="my-10"></div>
	);
};

export default Resume;
