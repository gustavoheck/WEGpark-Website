"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import FormField from "@/shared/components/atoms/FormField";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { WARNING_TYPE_MAP } from "../../enums/warning-type";
import { OccurrenceResponse } from "../../types/occurrence.type";
import { useUpdate } from "../../hooks/useOccurrence";
import {
  UpdateWarningFormValues,
  updateWarningSchema,
} from "../../schemas/OccurrenceSchema";
import { mapUpdateFormDataToEntity } from "../../mappers/occurrence.mapper";
import OccurrenceEditFormLayout from "./OccurrenceEditFormLayout";
import OccurrenceSelectField from "../create/OccurrenceSelectField";

type EditWarningOccurrenceFormProps = {
  occurrence: Extract<OccurrenceResponse, { warningType: string }>;
};

export default function EditWarningOccurrenceForm({
  occurrence,
}: EditWarningOccurrenceFormProps) {
  const router = useRouter();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const { mutate: updateWarning, isPending } = useUpdate();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateWarningFormValues>({
    resolver: zodResolver(updateWarningSchema),
    mode: "onChange",
    defaultValues: {
      plate: occurrence.defaults.vehicle?.plate ?? "Não informado",
      occurrenceType: "WARNING",
      location: occurrence.defaults.location,
      gate: occurrence.defaults.gate,
      warningType: occurrence.warningType,
      description: occurrence.description,
    },
  });

  const warningType = useWatch({ control, name: "warningType" });

  function openConfirmation() {
    setConfirmationOpen(true);
  }

  function submit(data: UpdateWarningFormValues) {
    const request = mapUpdateFormDataToEntity(data);

    updateWarning(
      {
        uuid: occurrence.uuid,
        request,
        occurrenceType: data.occurrenceType,
      },
      {
        onSuccess: () => {
          setConfirmationOpen(false);

          toast.add({
            type: "success",
            description: "Ocorrência atualizada com sucesso!",
          });

          router.replace("/ocorrencias");
        },
        onError: (error) => {
          setConfirmationOpen(false);

          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Erro ao atualizar a ocorrência. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <OccurrenceEditFormLayout
      onSubmit={handleSubmit(openConfirmation)}
      onConfirm={() => void handleSubmit(submit)()}
      confirmationOpen={confirmationOpen}
      onConfirmationOpenChange={setConfirmationOpen}
      pending={isPending}
      saveDisabled={!isDirty || isPending}
    >
      <FormField
        text="Placa do veículo"
        id="plate"
        registration={register("plate")}
        error={errors.plate}
        readOnly
      />
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

      <OccurrenceSelectField
        label="Tipo do aviso"
        value={warningType}
        onChange={(value) =>
          setValue("warningType", value, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
        error={errors.warningType?.message}
        options={WARNING_TYPE_MAP}
      />

      <FormField
        text="Descrição"
        id="description"
        registration={register("description")}
        error={errors.description}
      />
    </OccurrenceEditFormLayout>
  );
}
