import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EmployeeFormValues } from "../schemas/register-schema";

interface EmployeeFieldsProps {
    register: UseFormRegister<EmployeeFormValues>;
    errors: FieldErrors<EmployeeFormValues>;
}

export function EmployeeFields({ register, errors }: EmployeeFieldsProps) {
    return (
        <>
            <Field data-invalid={!!errors.department}>
                <FieldLabel htmlFor="department">Setor</FieldLabel>
                <Input id="department" {...register("department")} />
                {errors.department ? (
                    <FieldError>{errors.department.message}</FieldError>
                ): null}
            </Field>

            <Field data-invalid={!!errors.nameTagNumber}>
                <FieldLabel htmlFor="nameTagNumber">Número Crachá</FieldLabel>
                <Input id="nameTagNumber" {...register("nameTagNumber")} />
                {errors.nameTagNumber ? (
                    <FieldError>{errors.nameTagNumber.message}</FieldError>
                ): null}
            </Field>
        </>
    );
}