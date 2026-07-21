'use client'

import { FieldGroup } from "@/components/ui/field";
import Vehicle from "../../types/Vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { EditFormData, editSchema } from "../../schemas/EditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEdit } from "../../hooks/useEdit";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface EditFormProps {
    vehicle: Vehicle
}

export default function EditForm({ vehicle }: EditFormProps) {

    const { id, plate, brand, model, color } = vehicle

    const [isOpen, setIsOpen] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            plate,
            brand,
            model,
            color
        }
    });

    const { mutate, isPending } = useEdit();

    function handleConfirmSubmit(data: EditFormData) {
        mutate({ id, vehicleData: data });
        setIsOpen(false)
    }

    const handleOpenModal = () => {
        handleSubmit(() => setIsOpen(true))();
    };

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
                        normalText="Editar"
                        isPending={isPending}
                        pendingText="Editando"
                        onClick={handleOpenModal}
                    />
                    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold mb-2">
                                    Editar Veículo
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-md w-full text-wrap text-center">
                                    Você realmente deseja confirmar a edição deste veículo?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="py-5 text-md font-semibold">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleSubmit(handleConfirmSubmit)}
                                    disabled={isPending}
                                    className="py-5 text-md font-semibold"
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </form>
            </CardContent>
        </Card>
    )
}