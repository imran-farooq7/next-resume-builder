import { forwardRef, HTMLProps, Ref } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
	label: string;
	checkBox?: boolean;
}

const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
	return (
		<div>
			<label
				htmlFor={props.id}
				className={`${
					props.checkBox ? "inline" : "block"
				} text-sm font-medium leading-6 text-gray-900`}
			>
				{props.label}
			</label>
			<div className="mt-2">
				<input
					className="block w-full rounded-md border-0 py-3 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:pl-2"
					ref={ref}
					{...props}
				/>
			</div>
		</div>
	);
});

export default Input;
