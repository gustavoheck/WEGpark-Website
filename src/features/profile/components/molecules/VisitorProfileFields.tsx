// features/profile/components/molecules/VisitorProfileFields.tsx
import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { VisitorProfileFormValues } from "../../schemas/ProfileSchema";

interface VisitorProfileFieldsProps {
    register: UseFormRegister<VisitorProfileFormValues>;
    errors: FieldErrors<VisitorProfileFormValues>;
}

export function VisitorProfileFields({ register, errors }: VisitorProfileFieldsProps) {
    return (
        <>
            <FormField
                text="empresa"
                id="companyName"
                registration={register("companyName")}
                error={errors.companyName}
            />

            <FormField
                text="cpf"
                id="cpf"
                registration={register("cpf")}
                error={errors.cpf}
            />
        </>
    );
}