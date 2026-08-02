"use client";

import { useFormContext } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { VisitorFormValues } from "../../schemas/auth.schema";

export function VisitorRegistrationFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<VisitorFormValues>();

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