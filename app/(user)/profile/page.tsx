import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
	return (
		<div className="mt-6">
			<h1 className=" text-3xl font-bold text-blue-800">Profile</h1>
			<Tabs defaultValue="basic" className="w-[700px] mt-5">
				<TabsList>
					<TabsTrigger value="basic">Basic</TabsTrigger>
					<TabsTrigger value="education">Education</TabsTrigger>
					<TabsTrigger value="experience">Experience</TabsTrigger>
					<TabsTrigger value="skills">Skills</TabsTrigger>
				</TabsList>
				<TabsContent value="basic">
					Make changes to your account here.
				</TabsContent>
				<TabsContent value="education">Change your password here.</TabsContent>
				<TabsContent value="experience">Change your password here.</TabsContent>
				<TabsContent value="skills">Change your password here.</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProfilePage;
