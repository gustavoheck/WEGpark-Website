import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { VisitorFormValues } from "../schemas/register-schema";

interface VisitorFieldsProps {
    register: UseFormRegister<VisitorFormValues>;
    errors: FieldErrors<VisitorFormValues>;
}

export function VisitorFields({ register, errors }: VisitorFieldsProps) {
    return (
        <>
            <Field data-invalid={!!errors.company}>
                <FieldLabel htmlFor="company">Empresa</FieldLabel>
                <Input id="company" {...register("company")} />
                {errors.company ? (
                    <FieldError>{errors.company.message}</FieldError>
                ): null}
            </Field>

            <Field data-invalid={!!errors.cpf}>
                <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                <Input id="cpf" {...register("cpf")} />
                {errors.cpf ? (
                    <FieldError>{errors.cpf.message}</FieldError>
                ): null}
            </Field>
        </>
    );
}