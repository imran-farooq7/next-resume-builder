import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";

const Basic = () => {
	return (
		<form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
			<Input
				htmlForm="name"
				id="name"
				labelText="Name"
				name="name"
				placeholder="Name"
				type="text"
			/>
			<Input
				htmlForm="email"
				id="email"
				labelText="Email"
				name="email"
				placeholder="Email"
				type="email"
			/>
			<Input
				htmlForm="phone"
				id="phone"
				labelText="Phone"
				name="phone"
				placeholder="Phone"
				type="number"
			/>
			<TextArea />
		</form>
	);
};

export default Basic;
