'use client'

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSave } from "../../hooks/useSave";
import { DialogContent, DialogHeader, Dialog, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

export default function SaveForn() {
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
                    <AlertDialog open={isOpenConfirmation} onOpenChange={setIsOpenConfirmation}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold mb-2">
                                    Veículo já Existente
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-base w-full text-wrap text-center">
                                    Esse veículo já está cadastrado no sistema, deseja mandar uma notificação ao proprietário para se tornar um usuário?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="py-5 text-lg font-semibold">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleRequestOwnership}
                                    className="py-5 text-lg font-semibold"
                                >
                                    Solicitar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Dialog open={isOpenInformative} onOpenChange={setIsOpenInformative}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold mb-2 text-center">
                                    Veículo Cadastrado
                                </DialogTitle>
                                <DialogDescription className="text-base w-full text-wrap text-center">
                                    Veículo cadastrado com você de proprietário com sucesso!
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose className="text-lg font-semibold">Fechar</DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </form>
            </CardContent>
        </Card>
    )
}