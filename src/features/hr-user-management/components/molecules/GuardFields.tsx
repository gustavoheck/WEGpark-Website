import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { CreateGuardFormValues } from "../../schemas/CreateUserSchema";

interface GuardFieldsProps {
    register: UseFormRegister<CreateGuardFormValues>;
    errors: FieldErrors<CreateGuardFormValues>;
}

export function GuardFields({ register, errors }: GuardFieldsProps) {
    return (
        <>
            <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />
            <FormField text="departamento" id="department" registration={register("department")} error={errors.department} />
            <FormField text="chefe" id="chefe" registration={register("chefe")} error={errors.chefe} />
        </>
    );
}