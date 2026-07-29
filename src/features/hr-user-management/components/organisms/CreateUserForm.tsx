"use client";

import { useState } from "react";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";

import { useCreateUser } from "../../hooks/useUserManagement";
import {
    createUserSchema,
    CreateUserFormValues,
    CreateEmployeeFormValues,
    CreateGuardFormValues,
    CreateHRFormValues,
    CreateVisitorFormValues,
} from "../../schemas/CreateUserSchema";
import { UserRole, CreateUserRequestDTO } from "../../types/User";
import { UserTypeSelector } from "../molecules/UserTypeSelector";
import { EmployeeFields } from "../molecules/EmployeeFields";
import { GuardFields } from "../molecules/GuardFields";
import { HRFields } from "../molecules/HRFields";
import { VisitorFields } from "../molecules/VisitorFields";

export function CreateUserForm() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        mode: "onChange",
        shouldUnregister: true,
        defaultValues: { email: "", password: "", confirmPassword: "", name: "", phone: "" },
    });

    const { mutate: createUser, isPending, error } = useCreateUser();

    function handleSelectRole(role: UserRole) {
        setSelectedRole(role);
        setValue("role", role, { shouldValidate: true });
    }

    function handleConfirm() {
        setIsOpenConfirmation(true);
    }

    function onSubmit(data: CreateUserFormValues) {
        const { ...payload } = data;

        createUser(payload as CreateUserRequestDTO, {
            onSuccess: () => {
                setIsOpenConfirmation(false);
                setIsOpenSuccess(true);
            },
            onError: () => {
                setIsOpenConfirmation(false);
            },
        });
    }

    function handleSuccessClose() {
        setIsOpenSuccess(false);
        router.push("/gestao-usuarios");
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(handleConfirm)}>
                    <FieldGroup className="gap-4 mb-6">
                        <FormField text="nome" id="name" registration={register("name")} error={errors.name} />
                        <FormField text="email" id="email" type="email" registration={register("email")} error={errors.email} />
                        <FormField text="telefone" id="phone" registration={register("phone")} error={errors.phone} />
                        <FormField text="senha" id="password" type="password" registration={register("password")} error={errors.password} />
                        <FormField text="confirmar senha" id="confirmPassword" type="password" registration={register("confirmPassword")} error={errors.confirmPassword} />

                        <UserTypeSelector value={selectedRole} onChange={handleSelectRole} />

                        {selectedRole === "COLABORADOR" ? (
                            <EmployeeFields
                                register={register as unknown as UseFormRegister<CreateEmployeeFormValues>}
                                errors={errors as unknown as FieldErrors<CreateEmployeeFormValues>}
                            />
                        ) : null}

                        {selectedRole === "GUARITA" ? (
                            <GuardFields
                                register={register as unknown as UseFormRegister<CreateGuardFormValues>}
                                errors={errors as unknown as FieldErrors<CreateGuardFormValues>}
                            />
                        ) : null}

                        {selectedRole === "RH" ? (
                            <HRFields
                                register={register as unknown as UseFormRegister<CreateHRFormValues>}
                                errors={errors as unknown as FieldErrors<CreateHRFormValues>}
                            />
                        ) : null}

                        {selectedRole === "VISITANTE" ? (
                            <VisitorFields
                                register={register as unknown as UseFormRegister<CreateVisitorFormValues>}
                                errors={errors as unknown as FieldErrors<CreateVisitorFormValues>}
                            />
                        ) : null}
                    </FieldGroup>

                    {error ? (
                        <p className="text-sm text-destructive mb-4">
                            Não foi possível criar o usuário. Verifique os dados e tente novamente.
                        </p>
                    ) : null}

                    <FormButton text={isPending ? "cadastrando..." : "cadastrar usuário"} disabled={!selectedRole || !isValid} />

                    <AlertDialogComponent
                        open={isOpenConfirmation}
                        onOpenChange={setIsOpenConfirmation}
                        title="Cadastrar Usuário"
                        description="Confirma a criação desse usuário com os dados informados?"
                        onClick={handleSubmit(onSubmit)}
                        confirmText="Cadastrar"
                    />

                    <DialogComponent
                        open={isOpenSuccess}
                        onOpenChange={handleSuccessClose}
                        title="Usuário Criado"
                        description="O usuário foi cadastrado com sucesso!"
                    />
                </form>
            </CardContent>
        </Card>
    );
}