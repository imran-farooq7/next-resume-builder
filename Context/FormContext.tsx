import { createContext, useContext, useState } from "react";
interface FormContext {
	step: number;
	handleNextStep: () => void;
	handlePreviousStep: () => void;
	handleFormData: (data: any) => void;
	formData: {};
}
const formContext = createContext<FormContext | null>(null);

const FormProvider = ({ children }: { children: React.ReactNode }) => {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({});
	const handleNextStep = () => {
		if (step >= 0) {
			setStep((prev) => prev + 1);
		} else {
			return;
		}
	};
	const handlePreviousStep = () => {
		if (step <= 3) {
			setStep((prev) => prev - 1);
		} else {
			return;
		}
	};
	const handleFormData = (data: any) => {
		setFormData((prev) => {
			return {
				...prev,
				...data,
			};
		});
	};

	return (
		<formContext.Provider
			value={{
				step,
				handleNextStep,
				handlePreviousStep,
				handleFormData,
				formData,
			}}
		>
			{children}
		</formContext.Provider>
	);
};

export const useFormState = () => {
	return useContext(formContext);
};
export default FormProvider;
