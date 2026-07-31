"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Field,
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

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormButton from "@/shared/components/atoms/FormButton";

import { ResetPasswordAnswerFormValues, ResetPasswordAnswerSchema } from "../../schemas/auth.schema";
import { useResetPasswordCheck } from "../../hooks/auth.mutations";

interface VerifyResetCodeProps {
    email: string;
    onVerified: (resetToken: string) => void;
}

export function VerifyResetCodeForm({ email, onVerified }:VerifyResetCodeProps) {
    const { mutate, isPending, error } = useResetPasswordCheck();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordAnswerFormValues>({
        resolver: zodResolver(ResetPasswordAnswerSchema),
        defaultValues: { code: "" },
    });

    function onSubmit(values: ResetPasswordAnswerFormValues) {
        mutate(
            { email, code: values.code },
            { onSuccess: (data) => onVerified(data.resetToken) }
        );
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-center text-center">
                <SectionTitle className="py-2 flex" text="confirme o código" />
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
                                        <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} className="border-primary/40 w-12 h-12 text-xl" />
                                                <InputOTPSlot index={1} className="border-primary/40 w-12 h-12 text-xl" />
                                                <InputOTPSlot index={2} className="border-primary/40 w-12 h-12 text-xl" />
                                                <InputOTPSlot index={3} className="border-primary/40 w-12 h-12 text-xl" />
                                                <InputOTPSlot index={4} className="border-primary/40 w-12 h-12 text-xl" />
                                                <InputOTPSlot index={5} className="border-primary/40 w-12 h-12 text-xl" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                )}
                            />
                            {errors.code ? <FieldError>{errors.code.message}</FieldError> : null}
                        </Field>

                        {error ? (
                            <p className="text-sm text-destructive">
                                Código inválido ou expirado. Tente novamente.
                            </p>
                        ): null}
                        <FormButton disabled={isPending} text={isPending ? "Verificando..." : "Confirmar"}/>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}