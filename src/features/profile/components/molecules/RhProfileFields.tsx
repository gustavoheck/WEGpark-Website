import { FieldErrors, UseFormRegister } from "react-hook-form";

import FormField from "@/shared/components/atoms/FormField";

import { RhProfileFormValues } from "../../schemas/ProfileSchema";

interface RhProfileFieldsProps {
  register: UseFormRegister<RhProfileFormValues>;
  errors: FieldErrors<RhProfileFormValues>;
}

export function RhProfileFields({ register, errors }: RhProfileFieldsProps) {
  return (
    <FormField
      text="número do crachá"
      id="badgeNumber"
      type="number"
      registration={register("badgeNumber")}
      error={errors.badgeNumber}
    />
  );
}
