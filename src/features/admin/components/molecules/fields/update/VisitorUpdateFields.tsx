import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { UpdateVisitorFormValues } from "@/features/hr-user-management/schemas/update/UpdateUserSchema";

interface VisitorUpdateFieldsProps {
    register: UseFormRegister<UpdateVisitorFormValues>;
    errors: FieldErrors<UpdateVisitorFormValues>;
}

export function VisitorUpdateFields({ register, errors }: VisitorUpdateFieldsProps) {
    return (
        <>
            <FormField text="empresa" id="companyName" registration={register("companyName")} error={errors.companyName} />
            <FormField text="cpf" id="cpf" registration={register("cpf")} error={errors.cpf} />
        </>
    );
}