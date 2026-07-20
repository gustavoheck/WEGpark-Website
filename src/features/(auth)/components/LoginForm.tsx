"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { loginSchema, LoginFormData } from "../types/LoginSchema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && (
                            <span className="text-sm text-destructive">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input id="password" type="password" {...register("password")}/>
                        {errors.password && (
                            <span className="text-sm text-destructive">
                                {errors.password.message}
                            </span>
                        )}
                    </div>
                    
                    <Link
                        href={"/forgot-pass"}
                        className="text-sm text-primary hover:text-primary hover:underline"
                    >
                        Esqueceu a Senha?
                    </Link>

                    <Link
                        href={"/sign-up"}
                        className="text-sm text-primary hover:text-primary hover:underline"
                    >
                        Ainda não possui uma conta? Cadastre-se aqui
                    </Link>

                    {isError && (
                        <p className="text-sm text-destructive">
                            Email ou senha inválidos.
                        </p>
                    )}

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}