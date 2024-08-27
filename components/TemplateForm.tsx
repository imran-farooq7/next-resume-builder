"use client";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { uploadThumbnail } from "@/supabase/client";
import { createTemplate } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TemplateForm = () => {
	const { register, handleSubmit } = useForm();
	const [loading, setLoading] = useState(false);
	const [html, setHtml] = useState("");
	const router = useRouter();

	const onSubmit = async (data: FieldValues) => {
		try {
			setLoading(true);
			const url = await uploadThumbnail(data.thumbnail[0]);
			const tempData = {
				name: data.name,
				thumbnail: url,
				html,
				isPaid: data.isPaid,
			};
			const template = await createTemplate(tempData);
			if (
				template?.status === "success" &&
				url !== "The resource already exists"
			) {
				toast.success("Template created successfully");
				router.push("/admin/templates");
				router.refresh();
			} else {
				toast.error("Template creation failed");
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}
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
					label=""
					id="upload"
					type="file"
					className="hidden"
					{...register("thumbnail")}
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
				{loading ? <span className="animate-pulse">Saving...</span> : "Save"}
			</button>
		</form>
	);
};

export default TemplateForm;
