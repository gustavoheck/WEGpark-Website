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
import { SystemRole, SystemRoleType } from "@/shared/enum/SystemRoleType";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useResetPasswordCheck } from "../../hooks/useAuthMutations";
import {
  ResetPasswordCheckFormValues,
  ResetPasswordCheckSchema,
} from "../../schemas/auth.schema";

interface PasswordResetRequestFormProps {
  onCodeRequested: (
    email: string,
    role: SystemRoleType,
    numberTokenId: string,
  ) => void;
}

export function PasswordResetRequestForm({
  onCodeRequested,
}: PasswordResetRequestFormProps) {
  const { mutate, isPending } = useResetPasswordCheck();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordCheckFormValues>({
    resolver: zodResolver(ResetPasswordCheckSchema),
    defaultValues: { email: "", role: SystemRole.PARK },
  });

  function onSubmit(values: ResetPasswordCheckFormValues) {
    mutate(values, {
      onSuccess: (response) =>
        onCodeRequested(values.email, values.role, response.token),
      onError: (error) => {
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Não encontramos uma conta com esse e-mail.",
          ),
        });
      },
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle className="flex py-2" text="esqueci minha senha" />
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

            <FormButton
              disabled={isPending}
              text={isPending ? "Enviando..." : "Enviar código"}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
