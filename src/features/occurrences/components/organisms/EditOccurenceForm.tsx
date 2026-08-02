// features/occurrences/components/organisms/EditOccurrenceForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { toast } from "@/components/ui/toast";

import { Occurrence } from "../../types/Occurrence";
import { isWarning, isIllegalParking } from "../../utils/occurrence-guards";
import {
    updateWarningSchema,
    updateIllegalParkingSchema,
    updateTrafficAccidentSchema,
    UpdateWarningFormValues,
    UpdateIllegalParkingFormValues,
    UpdateTrafficAccidentFormValues,
} from "../../schemas/UpdateOccurrenceSchema";

import {
    useUpdateWarning,
    useUpdateIllegalParking,
    useUpdateTrafficAccident
} from "../../hooks/useUpdateOccurence";

interface EditOccurrenceFormProps {
    occurrence: Occurrence;
}

export default function EditOccurrenceForm({ occurrence }: EditOccurrenceFormProps) {
    if (isWarning(occurrence)) return <EditWarningForm occurrence={occurrence} />;
    if (isIllegalParking(occurrence)) return <EditIllegalParkingForm occurrence={occurrence} />;
    return <EditTrafficAccidentForm occurrence={occurrence} />;
}

function EditWarningForm({ occurrence }: { occurrence: Extract<Occurrence, { warningType: string }> }) {
    const router = useRouter();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { mutate: updateWarning, isPending } = useUpdateWarning();

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UpdateWarningFormValues>({
        resolver: zodResolver(updateWarningSchema),
        mode: "onChange",
        defaultValues: {
            location: occurrence.defaults.location,
            gate: occurrence.defaults.gate,
            warningType: occurrence.warningType,
            description: occurrence.description,
        },
    });

    function onSubmit(data: UpdateWarningFormValues) {
        updateWarning(
            { uuid: occurrence.uuid, data },
            {
                onSuccess: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "success", description: "Ocorrência atualizada com sucesso!" });
                    router.push("/ocorrencias");
                },
                onError: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "error", description: "Erro ao atualizar a ocorrência. Tente novamente." });
                },
            },
        );
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(() => setIsOpenConfirmation(true))}>
                    <FieldGroup className="gap-4 mb-6">
                        <FormField text="local / parque" id="location" registration={register("location")} error={errors.location} />
                        <FormField text="portaria" id="gate" registration={register("gate")} error={errors.gate} />
                        <FormField text="tipo do aviso" id="warningType" registration={register("warningType")} error={errors.warningType} />
                        <FormField text="descrição" id="description" registration={register("description")} error={errors.description} />
                    </FieldGroup>

                    <FormButton text="salvar alterações" disabled={!isDirty || !isValid} />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Salvar Alterações"
                        description="Deseja salvar as alterações feitas nessa ocorrência?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Salvar"
                        pending={isPending}
                    />
                </form>
            </CardContent>
        </Card>
    );
}

// --- Illegal Parking ---

function EditIllegalParkingForm({ occurrence }: { occurrence: Extract<Occurrence, { parkingSpaceType: string }> }) {
    const router = useRouter();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { mutate: updateIllegalParking, isPending } = useUpdateIllegalParking();

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UpdateIllegalParkingFormValues>({
        resolver: zodResolver(updateIllegalParkingSchema),
        mode: "onChange",
        defaultValues: {
            location: occurrence.defaults.location,
            gate: occurrence.defaults.gate,
            parkingSpaceType: occurrence.parkingSpaceType,
            description: occurrence.description,
        },
    });

    function onSubmit(data: UpdateIllegalParkingFormValues) {
        updateIllegalParking(
            { uuid: occurrence.uuid, data },
            {
                onSuccess: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "success", description: "Ocorrência atualizada com sucesso!" });
                    router.push("/ocorrencias");
                },
                onError: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "error", description: "Erro ao atualizar a ocorrência. Tente novamente." });
                },
            },
        );
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(() => setIsOpenConfirmation(true))}>
                    <FieldGroup className="gap-4 mb-6">
                        <FormField text="local / parque" id="location" registration={register("location")} error={errors.location} />
                        <FormField text="portaria" id="gate" registration={register("gate")} error={errors.gate} />
                        <FormField text="tipo de vaga" id="parkingSpaceType" registration={register("parkingSpaceType")} error={errors.parkingSpaceType} />
                        <FormField text="descrição" id="description" registration={register("description")} error={errors.description} />
                    </FieldGroup>

                    <FormButton text="salvar alterações" disabled={!isDirty || !isValid} />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Salvar Alterações"
                        description="Deseja salvar as alterações feitas nessa ocorrência?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Salvar"
                        pending={isPending}
                    />
                </form>
            </CardContent>
        </Card>
    );
}

function EditTrafficAccidentForm({ occurrence }: { occurrence: Extract<Occurrence, { trafficOccurrenceType: string }> }) {
    const router = useRouter();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { mutate: updateTrafficAccident, isPending } = useUpdateTrafficAccident();

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<UpdateTrafficAccidentFormValues>({
        resolver: zodResolver(updateTrafficAccidentSchema),
        mode: "onChange",
        defaultValues: {
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

    function onSubmit(data: UpdateTrafficAccidentFormValues) {
        updateTrafficAccident(
            { uuid: occurrence.uuid, data },
            {
                onSuccess: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "success", description: "Ocorrência atualizada com sucesso!" });
                    router.push("/ocorrencias");
                },
                onError: () => {
                    setIsOpenConfirmation(false);
                    toast.add({ type: "error", description: "Erro ao atualizar a ocorrência. Tente novamente." });
                },
            },
        );
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(() => setIsOpenConfirmation(true))}>
                    <FieldGroup className="gap-4 mb-6">
                        <FormField text="local / parque" id="location" registration={register("location")} error={errors.location} />
                        <FormField text="portaria" id="gate" registration={register("gate")} error={errors.gate} />
                        <FormField text="data/hora do ocorrido" id="occurrenceDate" type="datetime-local" registration={register("occurrenceDate")} error={errors.occurrenceDate} />
                        <FormField text="tipo de ocorrência" id="trafficOccurrenceType" registration={register("trafficOccurrenceType")} error={errors.trafficOccurrenceType} />
                        <FormField text="nome da vítima" id="victimName" registration={register("victimName")} error={errors.victimName} />
                        <FormField text="chefe responsável" id="responsibleBossName" registration={register("responsibleBossName")} error={errors.responsibleBossName} />
                        <FormField text="fábrica responsável" id="responsibleFactory" registration={register("responsibleFactory")} error={errors.responsibleFactory} />
                        <FormField text="seção responsável" id="responsibleSection" registration={register("responsibleSection")} error={errors.responsibleSection} />
                        <FormField text="depoimento do guarita" id="guardTestimony" registration={register("guardTestimony")} error={errors.guardTestimony} />
                        <FormField text="relato da vítima" id="victimTestimony" registration={register("victimTestimony")} error={errors.victimTestimony} />
                    </FieldGroup>

                    <FormButton text="salvar alterações" disabled={!isDirty || !isValid} />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Salvar Alterações"
                        description="Deseja salvar as alterações feitas nessa ocorrência?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Salvar"
                        pending={isPending}
                    />
                </form>
            </CardContent>
        </Card>
    );
}