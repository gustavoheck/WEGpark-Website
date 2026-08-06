import { useFormContext } from "react-hook-form";

import FormField from "@/shared/components/atoms/FormField";

import type { OccurrenceFormInput } from "@/features/occurrences/types/occurrence-form.type";

export default function TrafficAccidentOccurrenceFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<OccurrenceFormInput>();

  return (
    <>
      <FormField
        text="Data/hora do ocorrido"
        id="occurrenceDate"
        type="datetime-local"
        registration={register("occurrenceDate")}
        error={errors.occurrenceDate}
      />

      <FormField
        text="Tipo de ocorrência"
        id="trafficOccurrenceType"
        registration={register("trafficOccurrenceType")}
        error={errors.trafficOccurrenceType}
      />

      <FormField
        text="Nome da vítima"
        id="victimName"
        registration={register("victimName")}
        error={errors.victimName}
      />

      <FormField
        text="Chefe responsável"
        id="responsibleBossName"
        registration={register("responsibleBossName")}
        error={errors.responsibleBossName}
      />

      <FormField
        text="Fábrica responsável"
        id="responsibleFactory"
        registration={register("responsibleFactory")}
        error={errors.responsibleFactory}
      />

      <FormField
        text="Seção responsável"
        id="responsibleSection"
        registration={register("responsibleSection")}
        error={errors.responsibleSection}
      />

      <FormField
        text="Depoimento do guarita"
        id="guardTestimony"
        registration={register("guardTestimony")}
        error={errors.guardTestimony}
      />

      <FormField
        text="Relato da vítima"
        id="victimTestimony"
        registration={register("victimTestimony")}
        error={errors.victimTestimony}
      />
    </>
  );
}