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
import { ResetPasswordCheckFormValues, ResetPasswordCheckSchema } from "../../schemas/auth.schema";
import { useResetPasswordCheck } from "../../hooks/auth.mutations";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { SystemRole } from "@/shared/enum/SystemRoleType";

interface RequestResetFormProps {
    onCodeRequested: (email: string, role: SystemRoleType, numberTokenId: string) => void;
}

export function RequestResetForm({ onCodeRequested }: RequestResetFormProps) {
    const { mutate, isPending, isError } = useResetPasswordCheck();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordCheckFormValues>({
        resolver: zodResolver(ResetPasswordCheckSchema),
        defaultValues: { email: "", role: "ROLE_PARK" },
    });

    function onSubmit(values: ResetPasswordCheckFormValues) {
        mutate(values, {
            onSuccess: (response) => onCodeRequested(values.email, values.role, response.token),
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
                        <select
                            id="role"
                            {...register("role")}
                            className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                        >
                            <option value={SystemRole.PARK}>Usuário</option>
                            <option value={SystemRole.GUARD}>Guarita</option>
                            <option value={SystemRole.RH}>RH</option>
                            <option value={SystemRole.ADMIN}>Administrador</option>
                        </select>

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
