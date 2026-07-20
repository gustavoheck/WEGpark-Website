"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { 
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";

import { loginSchema, LoginFormData } from "../schemas/LoginSchema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
    const form  = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { mutate, isPending, isError } = useLogin();

    function onSubmit(data: LoginFormData) {
        mutate(data);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Entrar</CardTitle>
                <CardDescription>
                    Digite seu email e senha para acessar sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid ? (
                                        <FieldError errors={[fieldState.error]}/>
                                    ): null}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid ? (
                                        <FieldError errors={[fieldState.error]}/>
                                    ): null}
                                </Field>
                            )}
                        />       
                    </FieldGroup>
                    
                    <Link
                      href="/forgot-pass"
                      className="w-fit text-sm text-primary hover:text-primary hover:underline"
                    >
                        Esqueceu a senha?
                    </Link>

                    <p className="text-sm text-sm text-primary">
                        Ainda não possui uma conta?{" "}
                        <Link
                            href={"/sign-up"}
                            className="text-sm text-primary hover:text-primary hover:underline"
                        >
                            Cadastre-se aqui
                        </Link>
                    </p>

                    {isError ? (
                        <p className="text-sm text-destructive">
                            Email ou senha inválidos.
                        </p>
                    ): null}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}