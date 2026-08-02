"use client";

import { useState } from "react";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { toast } from "@/components/ui/toast";

import { useUpdateUser } from "../../hooks/useUserManagement";
import {    
    updateUserSchema,
    UpdateUserFormValues,
    UpdateEmployeeFormValues,
    UpdateGuardFormValues,
    UpdateHRFormValues,
    UpdateVisitorFormValues, 
}from "../../schemas/update/UpdateUserSchema";
import { UserDetailDTO, UpdateUserRequestDTO } from "../../types/User";
import { EmployeeUpdateFields } from "../molecules/fields/update/EmployeeUpdateFields";
import { GuardUpdateFields } from "../molecules/fields/update/GuardUpdateFields";
import { HRUpdateFields } from "../molecules/fields/update/HRUpdateFields";
import { VisitorUpdateFields } from "../molecules/fields/update/VisitorUpdateFields";
import { FieldError } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface EditUserFormProps {
    user: UserDetailDTO; 
}

export default function EditUserForm({ user }: EditUserFormProps) {
    const router = useRouter();
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const { mutate: updateUser } = useUpdateUser();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(updateUserSchema),
        mode: "onChange",
        shouldUnregister: true,
        defaultValues: user,
    });

    function handleOpenConfirmation() {
        setIsOpenConfirmation(true);
    }

    function onSubmit(data: UpdateUserFormValues) {
        setIsOpenConfirmation(false);

        updateUser(
            { id: user.id, data: data as UpdateUserRequestDTO },
            {
                onSuccess: () => {
                    toast.add({ type: "success", description: "Usuário atualizado com sucesso!"});
                    router.push("/gestao-usuarios");
                },
                onError: (error: unknown) => {
                    if(error instanceof AxiosError){
                        if (error.response?.status === 409) {
                            toast.add({ type: "error", description: "Já existe outro usuário cadastrado com este e-mail." });
                            return;
                        }
                    }
                    toast.add({ type: "error", description: "Erro ao atualizar o usuário. Tente novamente." });
                },
            },
        );
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(handleOpenConfirmation)}>
                    <FieldGroup className="gap-4 mb-6">
                        <input type="hidden" {...register("role")} defaultValue={user.role} />
                        <FormField text="nome" id="name" registration={register("name")} error={errors.name} />
                        <FormField text="email" id="email" type="email" registration={register("email")} error={errors.email as FieldError} />
                        <FormField text="telefone" id="phone" registration={register("phone")} error={errors.phone} />


                        {user.role === "EMPLOYEE" ? (
                            <EmployeeUpdateFields
                                register={register as unknown as UseFormRegister<UpdateEmployeeFormValues>}
                                errors={errors as unknown as FieldErrors<UpdateEmployeeFormValues>}
                            />
                        ) : null}

                        {user.role === "GUARD" ? (
                            <GuardUpdateFields
                                register={register as unknown as UseFormRegister<UpdateGuardFormValues>}
                                errors={errors as unknown as FieldErrors<UpdateGuardFormValues>}
                            />
                        ) : null}

                        {user.role === "HR" ? (
                            <HRUpdateFields
                                register={register as unknown as UseFormRegister<UpdateHRFormValues>}
                                errors={errors as unknown as FieldErrors<UpdateHRFormValues>}
                            />
                        ) : null}

                        {user.role === "VISITOR" ? (
                            <VisitorUpdateFields
                                register={register as unknown as UseFormRegister<UpdateVisitorFormValues>}
                                errors={errors as unknown as FieldErrors<UpdateVisitorFormValues>}
                            />
                        ) : null}
                    </FieldGroup>

                    <FormButton text="salvar alterações" disabled={!isDirty || !isValid} />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Salvar Alterações"
                        description="Você deseja salvar as alterações feitas nesse usuário?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Salvar"
                    />
                </form>
            </CardContent>
        </Card>
    );
}
