"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

import { useRequestResetCode } from "../../hooks/useResetPassword";

interface RequestResetFormProps {
    onCodeRequested: (email: string) => void;
}

export function RequestResetForm({ onCodeRequested }: RequestResetFormProps) {
    const { mutate, isPending, isError } = useRequestResetCode();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RequestResetFormValues>({
        resolver: zodResolver(requestResetSchema),
        defaultValues: { email: "" },
    });

    function onSubmit(values: RequestResetFormValues) {
        mutate(values.email, {
            onSuccess: () => onCodeRequested(values.email),
        });
    }

    return(
        <Card className="w-full max-w-sm">
            <CardHeader>
                <SectionTitle className="py-2 flex" text="esqueci minha senha"/>
                <CardDescription>
                    Informe o e-mail da sua conta para receber um código de recuperação.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FormField 
                            text="email"
                            id="email"
                            registration={register("email")}
                            error={errors.email}
                        />

                        {isError ? (
                            <p className="text-sm text-destructive">
                                Não encontramos uma conta com esse e-mail.
                            </p>
                        ) : null}
                        <FormButton disabled={isPending} text={isPending ? "Enviando..." : "Enviar código"}/>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}