import { UseFormRegister, FieldErrors } from "react-hook-form";
import FormField from "@/shared/components/atoms/FormField";
import { UpdateGuardFormValues } from "@/features/user-management/schemas/update/UpdateUserSchema";

interface GuardUpdateFieldsProps {
    register: UseFormRegister<UpdateGuardFormValues>;
    errors: FieldErrors<UpdateGuardFormValues>;
}

export function GuardUpdateFields({ register, errors }: GuardUpdateFieldsProps) {
    return (
        <>
            <FormField text="crachá" id="badgeNumber" registration={register("badgeNumber")} error={errors.badgeNumber} />
            <FormField text="departamento" id="department" registration={register("department")} error={errors.department} />
            <FormField text="chefe" id="chefe" registration={register("chefe")} error={errors.chefe} />
        </>
    );
}