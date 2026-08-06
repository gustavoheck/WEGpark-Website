"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import FormField from "@/shared/components/atoms/FormField";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import { UpdateTrafficAccidentFormValues, updateTrafficAccidentSchema } from "../../schemas/OccurrenceSchema";
import { useUpdate } from "../../hooks/useOccurrence";
import { OccurrenceResponse } from "../../types/occurrence.type";
import { mapUpdateFormDataToEntity } from "../../mappers/occurrence.mapper";
import OccurrenceEditFormLayout from "./OccurrenceEditFormLayout";

type EditTrafficAccidentOccurrenceFormProps = {
    occurrence: Extract<OccurrenceResponse, { trafficOccurrenceType: string }>;
};

export default function EditTrafficAccidentOccurrenceForm({
    occurrence,
}: EditTrafficAccidentOccurrenceFormProps) {
    const router = useRouter();
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const { mutate: updateTrafficAccident, isPending } =
        useUpdate();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<UpdateTrafficAccidentFormValues>({
        resolver: zodResolver(updateTrafficAccidentSchema),
        mode: "onChange",
        defaultValues: {
            plate: occurrence.defaults.vehicle.plate,
            occurrenceType: "TRAFFIC_ACCIDENT",
            location: occurrence.defaults.location,
            gate: occurrence.defaults.gate,
            occurrenceDate: occurrence.occurrenceDate,
            victimName: occurrence.victimName,
            responsibleBossName: occurrence.responsibleBossName,
            responsibleFactory: occurrence.responsibleFactory,
            responsibleSection: occurrence.responsibleSection,
            trafficOccurrenceType: occurrence.trafficOccurrenceType,
            guardTestimony: occurrence.guardTestimony,
            victimTestimony: occurrence.victimTestimony,
        },
    });

    function openConfirmation() {
        setConfirmationOpen(true);
    }

    function submit(data: UpdateTrafficAccidentFormValues) {
        const request = mapUpdateFormDataToEntity(data)

        updateTrafficAccident(
            {
                uuid: occurrence.uuid,
                request,
                occurrenceType: data.occurrenceType
            },
            {
                onSuccess: () => {
                    setConfirmationOpen(false);

                    toast.add({
                        type: "success",
                        description: "OcorrÃªncia atualizada com sucesso!",
                    });

                    router.replace("/ocorrencias");
                },
                onError: (error) => {
                    setConfirmationOpen(false);

                    toast.add({
                        type: "error",
                        description: getApiErrorMessage(
                            error,
                            "Erro ao atualizar a ocorrÃªncia. Tente novamente.",
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
            saveDisabled={!isDirty || !isValid || isPending}
        >
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

            <FormField
                text="Data/hora do ocorrido"
                id="occurrenceDate"
                type="datetime-local"
                registration={register("occurrenceDate")}
                error={errors.occurrenceDate}
            />

            <FormField
                text="Tipo de ocorrÃªncia"
                id="trafficOccurrenceType"
                registration={register("trafficOccurrenceType")}
                error={errors.trafficOccurrenceType}
            />

            <FormField
                text="Nome da vÃ­tima"
                id="victimName"
                registration={register("victimName")}
                error={errors.victimName}
            />

            <FormField
                text="Chefe responsÃ¡vel"
                id="responsibleBossName"
                registration={register("responsibleBossName")}
                error={errors.responsibleBossName}
            />

            <FormField
                text="FÃ¡brica responsÃ¡vel"
                id="responsibleFactory"
                registration={register("responsibleFactory")}
                error={errors.responsibleFactory}
            />

            <FormField
                text="SeÃ§Ã£o responsÃ¡vel"
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
                text="Relato da vÃ­tima"
                id="victimTestimony"
                registration={register("victimTestimony")}
                error={errors.victimTestimony}
            />
        </OccurrenceEditFormLayout>
    );
}
