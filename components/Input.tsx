interface Props {
	htmlForm: string;
	labelText: string;
	type: string;
	name: string;
	id: string;
	placeholder: string;
}
export default function Input({
	htmlForm,
	id,
	labelText,
	name,
	placeholder,
	type,
}: Props) {
	return (
		<div>
			<label
				htmlFor={htmlForm}
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				{labelText}
			</label>
			<div className="mt-2">
				<input
					type={type}
					name={name}
					id={id}
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
