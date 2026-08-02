'use client'

import { FieldGroup } from "@/components/ui/field";
import Vehicle from "../../../../shared/types/Vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { useState } from "react";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useVehicle } from "../../hooks/useVehicle";
import { mapFormDataToVehicleRequest } from "../../mappers/vehicleMapper";
import { AxiosError } from "axios";

interface EditFormProps {
    vehicle: Vehicle
}

export default function EditForm({ vehicle }: EditFormProps) {
    const router = useRouter();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { updateVehicle, isUpdating } = useVehicle();

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        mode: "onChange",
        defaultValues: {
            plate: vehicle.plate,
            brand: vehicle.brand,
            model: vehicle.model,
            color: vehicle.color
        }
    });

    function onSubmit(data: VehicleFormData) {

        const request = mapFormDataToVehicleRequest(data)

        updateVehicle(
            { uuid: vehicle.uuid, request },
            {
                onSuccess: () => {
                    setIsOpenConfirmation(false)
                    toast.add({ type: "success", description: "Veículo atualizado com sucesso!" })
                    router.push("/veiculos")
                },
                onError: (error: unknown) => {
                    setIsOpenConfirmation(false)
                    if (error instanceof AxiosError && error.response?.status === 409) {
                        toast.add({ type: "error", description: "Já existe outro veículo cadastrado com esta placa." });
                        return;
                    }
                    toast.add({ type: "error", description: "Erro ao atualizar o veículo. Tente novamente." });
                }
            }
        )
    }

    function handleOpenConfirmation() {
        setIsOpenConfirmation(true);
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(handleOpenConfirmation)}>
                    <FieldGroup className="gap-4 mb-6">
                        <FormField
                            text="placa"
                            id="plate"
                            registration={register("plate")}
                            error={errors.plate}
                        />
                        <FormField
                            text="marca"
                            id="brand"
                            registration={register("brand")}
                            error={errors.brand}
                        />
                        <FormField
                            text="modelo"
                            id="model"
                            registration={register("model")}
                            error={errors.model}
                        />
                        <FormField
                            text="cor"
                            id="color"
                            registration={register("color")}
                            error={errors.color}
                        />
                    </FieldGroup>
                    <FormButton
                        text="salvar alterações"
                        disabled={!isDirty || !isValid}
                    />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Salvar Alterações"
                        description="Você deseja salvar as alterações feitas sobre esse veículo?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Salvar"
                        pending={isUpdating}
                    />
                </form>
            </CardContent>
        </Card>
    )
}
