'use client'

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useSave } from "../../hooks/useSave";

export default function SaveForn() {

    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<VehicleFormData>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            plate : "",
            brand : "",
            model : "",
            color : ""
        }
    });

    const { mutate, isPending } = useSave();

    function handleConfirmSubmit(data: VehicleFormData) {
        mutate({vehicleData: data});
        setIsOpen(false)
    }

    const handleOpenModal = () => {
        handleSubmit(() => setIsOpen(true))();
    };

    const isButtonDisabled =  !isDirty || isPending

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(handleConfirmSubmit)}>
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
                        disabled={isButtonDisabled}
                        onClick={handleOpenModal}
                    />
                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold mb-2">
                                    Salvar Alterações
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-md w-full text-wrap text-center">
                                    Você deseja salvar as alterações feitas sobre esse veículo?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="py-5 text-md font-semibold">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleSubmit(handleConfirmSubmit)}
                                    disabled={isPending}
                                    className="py-5 text-md font-semibold"
                                >
                                    Salvar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </form>
            </CardContent>
        </Card>
    )
}