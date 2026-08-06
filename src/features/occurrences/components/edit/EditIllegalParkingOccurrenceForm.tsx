"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import FormField from "@/shared/components/atoms/FormField";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { PARKING_SPACE_MAP } from "../../enums/parking-space-map";
import { OccurrenceResponse } from "../../types/occurrence.type";
import { useUpdate } from "../../hooks/useOccurrence";
import { UpdateIllegalParkingFormValues, updateIllegalParkingSchema } from "../../schemas/OccurrenceSchema";
import { mapUpdateFormDataToEntity } from "../../mappers/occurrence.mapper";
import OccurrenceEditFormLayout from "./OccurrenceEditFormLayout";
import OccurrenceSelectField from "../create/OccurrenceSelectField";

type EditIllegalParkingOccurrenceFormProps = {
    occurrence: Extract<OccurrenceResponse, { parkingSpaceType: string }>;
};

export default function EditIllegalParkingOccurrenceForm({
    occurrence,
}: EditIllegalParkingOccurrenceFormProps) {
    const router = useRouter();
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const { mutate: updateIllegalParking, isPending } =
        useUpdate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isDirty, isValid },
        control,
    } = useForm<UpdateIllegalParkingFormValues>({
        resolver: zodResolver(updateIllegalParkingSchema),
        mode: "onChange",
        defaultValues: {
            plate: occurrence.defaults.vehicle.plate,
            occurrenceType: "ILLEGAL_PARKING",
            location: occurrence.defaults.location,
            gate: occurrence.defaults.gate,
            parkingSpaceType: occurrence.parkingSpaceType,
            description: occurrence.description,
        },
    });

    const parkingSpaceType = useWatch({ control, name: "parkingSpaceType" });

    function openConfirmation() {
        setConfirmationOpen(true);
    }

    function submit(data: UpdateIllegalParkingFormValues) {
        const request = mapUpdateFormDataToEntity(data)

        updateIllegalParking(
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

            <OccurrenceSelectField
                label="Tipo de vaga"
                value={parkingSpaceType}
                onChange={(value) =>
                    setValue("parkingSpaceType", value, {
                        shouldDirty: true,
                        shouldValidate: true,
                    })
                }
                error={errors.parkingSpaceType?.message}
                options={PARKING_SPACE_MAP}
            />

            <FormField
                text="DescriÃ§Ã£o"
                id="description"
                registration={register("description")}
                error={errors.description}
            />
        </OccurrenceEditFormLayout>
    );
}

