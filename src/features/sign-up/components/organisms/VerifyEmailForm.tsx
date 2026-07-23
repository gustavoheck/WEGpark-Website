"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup
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
    CardHeader
} from "@/components/ui/card";

import { useResendVerificationCode, useVerifyEmail } from "../../hooks/useVerifyEmail";
import { verifyEmailSchema, VerifyEmailFormValues } from "../../schemas/register-schema";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormButton from "@/shared/components/atoms/FormButton";

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
            <CardHeader className="flex flex-col items-center text-center">
                <SectionTitle className="py-2 flex" text="confirme seu e-mail"/>
                <CardDescription>
                    Enviamos um código de verificação para {email}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Field data-invalid={!!errors.code}>
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
                            
                            
                            <p className="text-sm text-sm text-muted-foreground">
                                Não recebeu o código de verificação?{" "}
                                <Link
                                    href={"#"}
                                    className="text-sm text-primary hover:text-primary hover:underline"
                                    onClick={handleResend}
                                >
                                    Clique aqui para reenviar
                                </Link>
                            </p>
                        </Field>

                        {error ? (
                            <p className="text-sm text-destructive">
                                Código inválido ou expirado. Tente novamente.
                            </p>
                        ) : null}

                        <FormButton disabled={isPending} text={isPending ? "Verificando..." : (isResending ? "Reenviando..." : "Confirmar")}/>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}