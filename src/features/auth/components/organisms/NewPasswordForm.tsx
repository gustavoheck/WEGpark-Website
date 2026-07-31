"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

import { NewPasswordFormValues, newPasswordSchema } from "../../schemas/auth.schema";

interface NewPasswordFormProps {
    resetToken: string;
    onReset: () => void;
}

export function NewPasswordForm({ resetToken, onReset }: NewPasswordFormProps) {
    const { mutate, isPending, isError } = useResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordFormValues>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    });

    function onSubmit(values: NewPasswordFormValues) {
        mutate(
            { resetToken, newPassword: values.password },
            { onSuccess: () => onReset() }
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <SectionTitle className="py-2 flex" text="nova senha" />
                <CardDescription>Crie uma nova senha para sua conta.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FormField
                            text="nova senha"
                            id="password"
                            type="password"
                            registration={register("password")}
                            error={errors.password}
                        />

                        <FormField
                            text="confirmar senha"
                            id="confirm-password"
                            type="password"
                            registration={register("confirmPassword")}
                            error={errors.confirmPassword}
                        />

                        {isError ? (
                            <p className="text-sm text-destructive">
                                Não foi possível redefinir a senha. Tente novamente.
                            </p>
                        ) : null}

                        <FormButton disabled={isPending} text={isPending ? "Salvando..." : "Redefinir senha"} />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}