"use client";

import { useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

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
                <CardTitle className="text-2xl">Cadastrar-se</CardTitle>
                <CardDescription>
                    Insira seus dados para se cadastrar no WEGpark
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">E-mail</FieldLabel>
                            <Input 
                                id="email"
                                type="email"
                                placeholder={
                                    userType === "COLABORADOR" ? "nome.sobrenome@weg.net" : "seuemail@exemplo.com"
                                }
                                aria-invalid={!!errors.email}
                                {...registerField("email")}
                            />
                            {errors.email ? (
                                <FieldError>{errors.email.message}</FieldError>
                            ) : null}
                        </Field>

                        <Field data-invalid={!!errors.password}>
                            <FieldLabel htmlFor="password">Senha</FieldLabel>
                            <Input 
                                id="password"
                                type="password"
                                aria-invalid={!!errors.password}
                                {...registerField("password")}
                            />
                            {errors.password ? (
                                <FieldError>{errors.password.message}</FieldError>
                            ): null}
                        </Field>

                        <Field data-invalid={!!errors.confirmPassword}>
                            <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
                            <Input 
                                id="confirm-password"
                                type="password"
                                aria-invalid={!!errors.confirmPassword}
                                {...registerField("confirmPassword")}
                            />
                            {errors.password && <FieldError>{errors.password.message}</FieldError>}
                        </Field>

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
                        <Button type="submit" disabled={!userType || isPending} className="w-full">
                            {isPending ? "Enviando..." : "Cadastrar"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}