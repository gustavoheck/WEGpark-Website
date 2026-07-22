"use client";

import { useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/components/ui/field";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

import { useRegister } from "../hooks/useRegister";
import { UserTypeSelector } from "./UserTypeSelector";
import { EmployeeFields } from "./EmployeeFields";
import { VisitorFields } from "./VisitorFields";
import {
    registerSchema,
    RegisterFormValues,
    EmployeeFormValues,
    VisitorFormValues,
} from "../schemas/register-schema";
import { RegisterRequestDTO, UserType } from "../types/register";

interface RegisterFormProps {
    onRegistered: (email: string) => void;
}

export function RegisterForm({ onRegistered }: RegisterFormProps) {
    const [userType, setUserType] = useState<UserType | null>(null);
    const { mutate: register, isPending, error } = useRegister();

    const {
        register: registerField,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    function handleSelectType(type: UserType) {
        setUserType(type);
        setValue("type", type, { shouldValidate: true });
    }
    
    function onSubmit(values: RegisterFormValues) {
        register(values as RegisterRequestDTO, {
            onSuccess: () => onRegistered(values.email),
        });
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>

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

                        <UserTypeSelector value={userType} onChange={handleSelectType}/>

                        {userType === "COLABORADOR" ? (
                            <>
                                <EmployeeFields 
                                    register={registerField as unknown as UseFormRegister<EmployeeFormValues>}
                                    errors={errors as unknown as FieldErrors<EmployeeFormValues>}
                                />
                            </>
                        ) : null}

                        {userType === "VISITANTE" ? (
                            <>
                                <VisitorFields 
                                    register={registerField as unknown as UseFormRegister<VisitorFormValues>}
                                    errors={errors as unknown as FieldErrors<VisitorFormValues>}
                                />
                            </>
                        ) : null}

                        {error ? (
                            <p className="text-sm text-destructive">
                                Não foi possível concluir o cadastro. Tente novamente.
                            </p>
                        ) : null}
                        <FormButton disabled={!userType || isPending} text={isPending ? "Enviando..." : "Cadastrar"} />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}