"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/components/ui/field";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

import { useRegister } from "../../hooks/useRegister";
import { UserTypeSelector } from "../molecules/UserTypeSelector";
import { EmployeeFields } from "../molecules/CollaboratorFields";
import { VisitorFields } from "../molecules/VisitorFields";
import {
    registerSchema,
    RegisterFormValues,
} from "../../schemas/register-schema";
import { UserType } from "../../enums/UserType";
import { RegisterRequest } from "../../types/registerRequest";
import { toast } from "@/components/ui/toast";

interface RegisterFormProps {
    onRegistered: (email: string) => void;
}

export function RegisterForm({ onRegistered }: RegisterFormProps) {
    const [userType, setUserType] = useState<UserType | null>(null);
    const { mutate: register, isPending, error } = useRegister();

    const methods = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const {
        register: registerField,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    const currentType = watch("type");

    function handleSelectType(type: UserType) {
        setUserType(type);
        setValue("type", type as any, { shouldValidate: true });
    }

    function onSubmit(values: RegisterFormValues) {
        if (!userType) return;

        let payload: RegisterRequest;

        const defaults = { email: values.email, password: values.password };
        const parkUserDefault = { name: values.name, telephone: values.telephone };

        if (values.type === "COLLABORATOR") {
            payload = {
                defaults,
                parkUserDefault,
                badgeNumber: values.badgeNumber,
                location: values.location,
            };
        } else {
            payload = {
                defaults,
                parkUserDefault,
                company: values.company,
                cpf: values.cpf,
            };
        }

        console.log(payload)

        register(
            { payload, userType },
            {
                onSuccess: () => {
                    onRegistered(values.email);
                    toast.add({ type: "success", description: "Cadastro realizado com sucesso!" });
                },
                onError: () => {
                    toast.add({ type: "error", description: "Erro ao realizar cadastro." });
                },
            }
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <SectionTitle className="py-2 flex" text="cadastrar-se" />
                <CardDescription>
                    Insira seus dados para se cadastrar no WEGpark
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <FormField
                                text="nome completo"
                                id="name"
                                registration={registerField("name")}
                                error={errors.name}
                            />

                            <FormField
                                text="telefone"
                                id="telephone"
                                registration={registerField("telephone")}
                                error={errors.telephone}
                            />

                            <FormField
                                text="email"
                                id="email"
                                registration={registerField("email")}
                                error={errors.email}
                            />

                            <FormField
                                text="senha"
                                id="password"
                                type="password"
                                registration={registerField("password")}
                                error={errors.password}
                            />

                            <FormField
                                text="confirmar senha"
                                id="confirm-password"
                                type="password"
                                registration={registerField("confirmPassword")}
                                error={errors.confirmPassword}
                            />

                            <UserTypeSelector value={userType} onChange={handleSelectType} />

                            {currentType === "COLLABORATOR" && <EmployeeFields />}

                            {currentType === "VISITOR" && <VisitorFields />}

                            {error && (
                                <p className="text-sm text-destructive">
                                    Não foi possível concluir o cadastro. Tente novamente.
                                </p>
                            )}
                            <FormButton
                                disabled={!userType || isPending}
                                text={isPending ? "Enviando..." : "Cadastrar"}
                            />
                        </FieldGroup>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}