import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { CreateVisitorFormValues } from "../../schemas/CreateUserSchema";

interface VisitorFieldsProps {
    register: UseFormRegister<CreateVisitorFormValues>;
    errors: FieldErrors<CreateVisitorFormValues>;
}

export function VisitorFields({ register, errors }: VisitorFieldsProps) {
    return (
        <>
            <FormField text="empresa" id="companyName" registration={register("companyName")} error={errors.companyName} />
            <FormField text="CPF" id="cpf" registration={register("cpf")} error={errors.cpf} />
        </>
    );
}