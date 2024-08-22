import Basic from "@/components/Basic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
	return (
		<div className="mt-6">
			<h1 className=" text-3xl font-bold text-blue-800">Profile</h1>
			<Tabs defaultValue="basic" className="w-full mt-5">
				<TabsList>
					<TabsTrigger value="basic">Basic</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
					<TabsTrigger value="experience">Experience</TabsTrigger>
					<TabsTrigger value="skills">Skills</TabsTrigger>
				</TabsList>
				<TabsContent className="mt-6" value="basic">
					<Basic />
				</TabsContent>
				<TabsContent value="education">Change your password here.</TabsContent>
				<TabsContent value="experience">Change your password here.</TabsContent>
				<TabsContent value="skills">Change your password here.</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProfilePage;
