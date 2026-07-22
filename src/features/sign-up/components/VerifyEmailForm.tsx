"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";

import { 
    InputOTP, 
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useResendVerificationCode, useVerifyEmail } from "../hooks/useVerifyEmail";
import { verifyEmailSchema, VerifyEmailFormValues } from "../schemas/register-schema";

interface VerifyEmailFormProps {
    email: string;
    onVerified: () => void;
}

export function VerifyEmailForm({ email, onVerified }: VerifyEmailFormProps) {
    const { mutate: verifyEmail, isPending, error } = useVerifyEmail();
    const { mutate: resendCode, isPending: isResending } = useResendVerificationCode();
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyEmailFormValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            code: "",
        },
    });

    function onSubmit(values: VerifyEmailFormValues) {
        verifyEmail(
            { email, code: values.code },
            { onSuccess: () => onVerified() }
        );
    }

    function handleResend() {
        resendCode(email);
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Confirme seu e-mail</CardTitle>
                <CardDescription>
                    Enviamos um código de verificação para {email}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field data-invalid={!!errors.code}>
                            <FieldLabel htmlFor="code">Código de verificação</FieldLabel>
                                <Controller
                                    control={control}
                                    name="code"
                                    render={({ field }) => (
                                        <div className="flex justify-center py-2">
                                            <InputOTP 
                                                maxLength={6}
                                                value={field.value}
                                                onChange={field.onChange}
                                            >
                                                <InputOTPGroup className="">
                                                    <InputOTPSlot index={0} className="border-primary/40 w-12 h-12 text-xl"/>

                                                    <InputOTPSlot index={1} className="border-primary/40 w-12 h-12 text-xl"/>

                                                    <InputOTPSlot index={2} className="border-primary/40 w-12 h-12 text-xl"/>

                                                    <InputOTPSlot index={3} className="border-primary/40 w-12 h-12 text-xl"/>

                                                    <InputOTPSlot index={4} className="border-primary/40 w-12 h-12 text-xl"/>

                                                    <InputOTPSlot index={5} className="border-primary/40 w-12 h-12 text-xl"/>
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </div>
                                    )}
                                />
                            <FieldDescription>
                                Digite o código de 6 dígitos enviado para o seu e-mail.
                            </FieldDescription>
                            {errors.code ? (
                                <FieldError>{errors.code.message}</FieldError>
                            ) : null}
                        </Field>

                        {error ? (
                            <p className="text-sm text-destructive">
                                Código inválido ou expirado. Tente novamente.
                            </p>
                        ) : null}

                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? "Verificando..." : "Confirmar"}
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isResending}
                            onClick={handleResend}
                            className="w-full"
                        >
                            {isResending ? "Reenviando..." : "Reenviar código"}
                        </Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}