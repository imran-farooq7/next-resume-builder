export default function TextArea() {
	return (
		<div>
			<label
				htmlFor="career"
				className="block text-sm font-medium leading-6 text-gray-900"
			>
				Career Objectives
			</label>
			<div className="mt-2">
				<textarea
					rows={4}
					name="career"
					id="career"
					placeholder="Career Objectives"
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
				/>
			</div>
		</div>
	);
}
