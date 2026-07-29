"use client";

import { useFormContext } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { collaboratorFormValues } from "../../schemas/collaboratorSchema";

export function EmployeeFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<collaboratorFormValues>();

    return (
        <>
            <FormField
                text="setor"
                id="location"
                registration={register("location")}
                error={errors.location}
            />
            <FormField
                text="crachá"
                id="badgeNumber"
                registration={register("badgeNumber")}
                error={errors.badgeNumber}
            />
        </>
    );
}