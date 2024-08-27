"use client";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";

const TemplateForm = () => {
	const { register, handleSubmit } = useForm();
	const [html, setHtml] = useState("");
	const onSubmit = (data: FieldValues) => {
		const template = { ...data, html };
		console.log(template);
	};
	return (
		<form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Name"
				{...register("name", {
					required: true,
				})}
				placeholder="Enter template name"
			/>
			<div className="rounded-md border border-emerald-400 bg-emerald-50 p-4 shadow-md w-52">
				<label
					htmlFor="upload"
					className="flex flex-col items-center gap-2 cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 fill-white stroke-emerald-400"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span className="text-gray-600 font-medium">Upload Thumbnail</span>
				</label>
				<Input
					{...register("thumbnail")}
					label=""
					id="upload"
					type="file"
					className="hidden"
				/>
			</div>
			<div>
				<label htmlFor="html">HTML</label>
				<CodeMirror id="HTML" value={html} onChange={(val) => setHtml(val)} />
			</div>
			<div className="flex gap-4 items-center">
				<label htmlFor="checkbox">Is it paid?</label>
				<input
					type="checkbox"
					id="checkbox"
					{...register("isPaid")}
					className="h-4 w-4 rounded border-gray-300 text-emerald-400 focus:ring-emerald-400"
				/>
			</div>
			<button className="bg-emerald-400 self-end text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out">
				Save
			</button>
		</form>
	);
};

export default TemplateForm;
