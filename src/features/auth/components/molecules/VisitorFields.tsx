"use client";

import { useFormContext } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { visitorFormValues } from "../../schemas/visitorSchema";

export function VisitorFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<visitorFormValues>();

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