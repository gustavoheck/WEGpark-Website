'use client'

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { useState } from "react";
import { useSave } from "../../hooks/useSave";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";

export default function SaveForm() {
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false)
    const [isOpenInformative, setIsOpenInformative] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        mode: "onChange"
    });

    const { mutate: saveVehicle, isPending: isSaving } = useSave();

    function onSubmit(data: VehicleFormData){
        saveVehicle(
            { vehicleData : data },
            {
                onSuccess: () => {
                    setIsOpenInformative(true)
                },
                onError: (error : any) => {
                    if (error?.response?.status === 404){
                        setIsOpenInformative(true)
                    }
                    // Erro de conflito, que acionará o dialog de confirmação
                    if (error?.response?.status === 409){
                        setIsOpenConfirmation(true)
                    }
                }
            }
        )
    }

    function handleRequestOwnership () {
        // Service que notificará o proprietário
        setIsOpenConfirmation(false)
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        text="salvar veículo"
                        disabled={!isValid || isSaving}
                    />
                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Veículo já Existente"
                        description="Esse veículo já está cadastrado no sistema, deseja mandar uma notificação ao proprietário para se tornar um usuário?"
                        onClick={handleRequestOwnership}
                        confirmText="Solicitar"
                    />

                    <DialogComponent
                        open={isOpenInformative}
                        onOpenChange={setIsOpenInformative}
                        title="Veículo Cadastrado"
                        description="Veículo cadastrado com você de proprietário com sucesso!"
                    
                    />
                </form>
            </CardContent>
        </Card>
    )
}