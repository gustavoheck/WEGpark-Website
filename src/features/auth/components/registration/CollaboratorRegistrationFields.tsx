"use client";

import { useFormContext } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { CollaboratorFormValues } from "../../schemas/auth.schema";

export function CollaboratorRegistrationFields() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CollaboratorFormValues>();

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