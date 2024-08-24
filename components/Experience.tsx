import { useFormState } from "@/Context/FormContext";
import { useFieldArray, useForm } from "react-hook-form";
import Input from "./Input";
import { TrashIcon } from "@heroicons/react/24/outline";
interface FormValues {
	experiences: {
		company: string;
		role: string;
		startDate: string;
		endDate: string;
		description: string;
	}[];
}

const Experience = () => {
	const context = useFormState();
	const { register, handleSubmit, control } = useForm<FormValues>({
		defaultValues: context?.formData,
	});
	const { fields, append, remove } = useFieldArray({
		name: "experiences",
		control,
	});
	const handleFormSubmit = (data: FormValues) => {
		context?.handleFormData(data);
		// context?.handleNextStep();
	};
	return (
		<form onSubmit={handleSubmit(handleFormSubmit)}>
			<div>
				<button
					type="button"
					onClick={() =>
						append({
							company: "",
							role: "",
							startDate: "",
							endDate: "",
							description: "",
						})
					}
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Add experience
				</button>
			</div>
			{fields.map((field, i) => {
				return (
					<div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-4 mt-8"
						key={field.id}
					>
						<Input
							label="Company"
							{...register(`experiences.${i}.company`, { required: true })}
							type="text"
						/>
						<Input
							label="Role"
							{...register(`experiences.${i}.role`, { required: true })}
							type="text"
						/>
						<Input
							label="Start Date"
							{...register(`experiences.${i}.startDate`, { required: true })}
							type="text"
						/>
						<Input
							label="End Date"
							{...register(`experiences.${i}.endDate`, { required: true })}
							type="text"
						/>

						<div className="mt-2">
							<label
								htmlFor="career"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Description
							</label>
							<textarea
								rows={4}
								id="career"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
								{...register(`experiences.${i}.description`, {
									required: true,
								})}
							/>
						</div>

						<TrashIcon
							className="text-red-600 w-8 mt-8 cursor-pointer"
							onClick={() => remove(i)}
						/>
					</div>
				);
			})}
			<div className="flex justify-between max-w-4xl mt-40">
				<button
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
					onClick={() => context?.handlePreviousStep()}
				>
					Back
				</button>
				<button
					type="submit"
					className="bg-emerald-400 text-white py-3 px-10 rounded-lg mt-4 hover:scale-105 transition-all ease-in-out"
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default Experience;
