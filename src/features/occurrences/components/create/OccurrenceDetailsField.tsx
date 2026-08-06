import { useFormContext, useWatch } from "react-hook-form";

import FormField from "@/shared/components/atoms/FormField";

import type { OccurrenceFormInput } from "@/features/occurrences/types/occurrence-form.type";
import TrafficAccidentOccurrenceFields from "./TrafficAccidentOccurrenceFields";
import { OccurrenceTypeSelector } from "../molecules/OccurrenceTypeSelector";
import WarningOccurrenceFields from "./WarningOcurrenceFields";
import IllegalParkingOccurrenceFields from "./IllegalParkingOccurrenceField";

export default function OccurrenceDetailsFields() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OccurrenceFormInput>();

  const occurrenceType = useWatch({
    control,
    name: "occurrenceType",
  });

  return (
    <>
      <FormField
        text="Local / parque"
        id="location"
        registration={register("location")}
        error={errors.location}
      />

      <FormField
        text="Portaria"
        id="gate"
        registration={register("gate")}
        error={errors.gate}
      />

      <input type="hidden" {...register("occurrenceType")} />

      <OccurrenceTypeSelector
        value={occurrenceType}
        onChange={(type) => {
          setValue("occurrenceType", type, {
            shouldDirty: true,
            shouldValidate: true,
          });
        }}
      />

      {errors.occurrenceType?.message && (
        <p className="text-sm text-destructive">
          {errors.occurrenceType.message}
        </p>
      )}

      {occurrenceType === "WARNING" && <WarningOccurrenceFields />}

      {occurrenceType === "ILLEGAL_PARKING" && (
        <IllegalParkingOccurrenceFields />
      )}

      {occurrenceType === "TRAFFIC_ACCIDENT" && (
        <TrafficAccidentOccurrenceFields />
      )}
    </>
  );
}