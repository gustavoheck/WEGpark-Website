"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import FormField from "@/shared/components/atoms/FormField";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import FormButton from "@/shared/components/atoms/FormButton";
import { loginSchema, LoginFormData } from "../../../schemas/LoginSchema";
import { useLogin } from "../../../hooks/useLogin";

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
                <SectionTitle text="Entrar" className="py-2 flex" />
                <CardDescription>
                    Digite seu email e senha para acessar sua conta.
                </CardDescription>
            </CardHeader>
            <CardContent>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FieldGroup>

                        <FormField 
                            text="email"
                            id="email"
                            registration={form.register("email")}
                            error={form.formState.errors.email}
                        />

                        <FormField 
                            text="senha"
                            type="password"
                            id="password"
                            registration={form.register("password")}
                            error={form.formState.errors.password}
                        />
      
                    </FieldGroup>
                    
                    <Link
                      href="/esqueceu-senha"
                      className="w-fit text-sm text-primary hover:text-primary hover:underline"
                    >
                        Esqueceu a senha?
                    </Link>

                    <p className="text-sm text-sm text-muted-foreground">
                        Ainda não possui uma conta?{" "}
                        <Link
                            href={"/cadastro"}
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

                    <FormButton disabled={isPending} text={isPending ? "Entrando..." : "Entrar"}/>
                        
                </form>
            </CardContent>
        </Card>
    );
}