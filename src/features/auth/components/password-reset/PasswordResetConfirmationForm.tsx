"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import FormButton from "@/shared/components/atoms/FormButton";
import FormField from "@/shared/components/atoms/FormField";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useResetPassword } from "../../hooks/useAuthMutations";
import {
  NewPasswordFormValues,
  newPasswordSchema,
} from "../../schemas/auth.schema";

interface PasswordResetConfirmationFormProps {
  resetToken: string;
  email: string;
  role: SystemRoleType;
  onReset: () => void;
}

export function PasswordResetConfirmationForm({
  resetToken,
  email,
  role,
  onReset,
}: PasswordResetConfirmationFormProps) {
  const { mutate, isPending } = useResetPassword();

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
      {
        email,
        password: values.password,
        role,
        tokenIfPasswordReset: resetToken,
      },
      {
        onSuccess: onReset,
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Não foi possível redefinir a senha. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle className="flex py-2" text="nova senha" />
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

            <FormButton
              disabled={isPending}
              text={isPending ? "Salvando..." : "Redefinir senha"}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
