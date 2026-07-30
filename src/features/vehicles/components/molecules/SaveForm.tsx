'use client'

import { FieldGroup } from "@/components/ui/field";
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

export default function SaveForm() {
    const router = useRouter();
    const [isOpenConfirmationNormal, setIsOpenConfirmationNormal] = useState(false);
    const [isOpenConfirmationLink, setIsOpenConfirmationLink] = useState(false);
    const { createVehicle, isCreating } = useVehicle();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        mode: "onChange"
    });

    function onSubmit(data: VehicleFormData) {

        const request = mapFormDataToVehicleRequest(data)

        createVehicle(
            request,
            {
                onSuccess: () => {
                    setIsOpenConfirmationNormal(false)
                    toast.add({type : "success" , description : "Veículo cadastrado com sucesso!"})
                    router.push("/veiculos")
                },
                onError: (error: any) => {
                    setIsOpenConfirmationNormal(false)
                    if (error?.response?.status === 409) {
                        setIsOpenConfirmationLink(true)
                    }
                    else {
                        toast.add({type : "error" , description : "Erro ao cadastrar veículo. Tente novamente."})
                    }
                }
            }
        )
    }

    function handleOpenConfirmation () {
        setIsOpenConfirmationNormal(true)
    }

    function handleRequestOwnership() {
        setIsOpenConfirmationLink(false)
        toast.add({type : "info", description : "Propretário notificado. Aguarde a resposta."})
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
                        text="cadastrar veículo"
                        disabled={!isValid}
                    />
                    <AlertDialogComponent
                        open={isOpenConfirmationNormal}
                        onOpenChange={setIsOpenConfirmationNormal}
                        title="Cadastrar Veículo"
                        description="Você realmente deseja cadastrar este veículo?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Cadastrar"
                        pending={isCreating}
                    />
                    <AlertDialogComponent
                        open={isOpenConfirmationLink}
                        onOpenChange={setIsOpenConfirmationLink}
                        title="Veículo já Existente"
                        description="Esse veículo já está cadastrado no sistema, deseja mandar uma notificação ao proprietário para se tornar um usuário?"
                        onClick={handleRequestOwnership}
                        confirmText="Solicitar"
                    />
                </form>
            </CardContent>
        </Card>
    )
}