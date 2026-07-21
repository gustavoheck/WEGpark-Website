'use client'

import { FieldGroup} from "@/components/ui/field";
import Vehicle from "../../types/Vehicle";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { EditFormData, editSchema } from "../../schemas/EditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEdit } from "../../hooks/useEdit";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

interface EditFormProps {
    vehicle: Vehicle
}

export default function EditForm({ vehicle }: EditFormProps) {

    const { id, plate, brand, model, color } = vehicle

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

    function onSubmit(data: EditFormData) {
        mutate({ id, vehicleData: data });
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
                        isPending={isPending}
                        normalText="Editar"
                        pendingText="Editando"
                    />
                </form>
            </CardContent>

        </Card>

    )
}