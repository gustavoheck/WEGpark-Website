import { useFormContext, useWatch } from "react-hook-form";

import FormField from "@/shared/components/atoms/FormField";

import { PARKING_SPACE_MAP } from "@/features/occurrences/enums/parking-space-map";
import type { OccurrenceFormInput } from "@/features/occurrences/types/occurrence-form.type";
import OccurrenceSelectField from "./OccurrenceSelectField";

export default function IllegalParkingOccurrenceFields() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OccurrenceFormInput>();

  const parkingSpaceType = useWatch({
    control,
    name: "parkingSpaceType",
  });

  return (
    <>
      <OccurrenceSelectField
        label="Tipo de vaga"
        value={parkingSpaceType}
        onChange={(value) => {
          setValue("parkingSpaceType", value, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
        error={errors.parkingSpaceType?.message}
        options={PARKING_SPACE_MAP}
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