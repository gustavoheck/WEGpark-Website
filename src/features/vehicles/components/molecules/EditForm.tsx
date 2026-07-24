'use client'

import { FieldGroup } from "@/components/ui/field";
import Vehicle from "../../../../shared/types/Vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEdit } from "../../hooks/useEdit";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { useState } from "react";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";

interface EditFormProps {
    vehicle: Vehicle
}

export default function EditForm({ vehicle }: EditFormProps) {
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
    const [isOpenInformative, setIsOpenInformative] = useState(false)

    const { uuid, plate, brand, model, color } = vehicle

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        mode: "onChange",
        defaultValues: {
            plate,
            brand,
            model,
            color
        }
    });

     const { mutate : editVehicle, isPending } = useEdit();

    function onSubmit(data: VehicleFormData){
        editVehicle(
            { uuid, vehicleData : data },
            {
                onSuccess: () => {
                    setIsOpenConfirmation(false)
                    setIsOpenInformative(true)
                },
                // Função provisória para funcionar corretamente sem uma API
                onError: (error) => {
                    setIsOpenConfirmation(false)
                    alert("Erro!")
                }
            }
        )
    }

    function handleConfirmateEdit() {
        setIsOpenConfirmation(true);
    };

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(handleConfirmateEdit)}>
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
                    
                    />

                    <DialogComponent
                        open={isOpenInformative}
                        onOpenChange={setIsOpenInformative}
                        title="Alterações Salvas"
                        description="Os dados editados sobre o veículo foram salvos com sucesso!"
                    
                    />
                </form>
            </CardContent>
        </Card>
    )
}