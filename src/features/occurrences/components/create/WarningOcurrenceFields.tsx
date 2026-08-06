import { useFormContext, useWatch } from "react-hook-form";

import FormField from "@/shared/components/atoms/FormField";

import { WARNING_TYPE_MAP } from "@/features/occurrences/enums/warning-type";
import type { OccurrenceFormInput } from "@/features/occurrences/types/occurrence-form.type";
import OccurrenceSelectField from "./OccurrenceSelectField";

export default function WarningOccurrenceFields() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OccurrenceFormInput>();

  const warningType = useWatch({
    control,
    name: "warningType",
  });

  return (
    <>
      <OccurrenceSelectField
        label="Tipo do aviso"
        value={warningType}
        onChange={(value) => {
          setValue("warningType", value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        error={errors.warningType?.message}
        options={WARNING_TYPE_MAP}
      />

      <FormField
        text="Descrição"
        id="description"
        registration={register("description")}
        error={errors.description}
      />
    </>
  );
}