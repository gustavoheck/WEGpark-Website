import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { VisitorFormValues } from "../../schemas/register-schema";

interface VisitorFieldsProps {
    register: UseFormRegister<VisitorFormValues>;
    errors: FieldErrors<VisitorFormValues>;
}

export function VisitorFields({ register, errors }: VisitorFieldsProps) {
    return (
        <>
            <FormField 
                text="empresa"
                id="company"
                registration={register("company")}
                error={errors.company}
            />
            <FormField 
                text="CPF"
                id="cpf"
                registration={register("cpf")}
                error={errors.cpf}
            />
        </>
    );
}