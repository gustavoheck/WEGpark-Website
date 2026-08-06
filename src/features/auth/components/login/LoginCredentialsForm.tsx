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
import { clearAuthCookies, useAuth } from "@/shared/context/AuthContext";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";

import { useLogin } from "../../hooks/useAuthMutations";
import {
  LoginPasswordFormValues,
  loginPasswordSchema,
} from "../../schemas/auth.schema";
import axios from "axios";
import delay from "@/shared/utils/delay";
import { useQueryClient } from "@tanstack/react-query";

interface LoginCredentialsFormProps {
  email: string;
  role: SystemRoleType;
  onLoginSuccess: (role: SystemRoleType) => void;
  onNotVerified: () => void;
}

export function LoginCredentialsForm({
  email,
  role,
  onLoginSuccess,
  onNotVerified,
}: LoginCredentialsFormProps) {
  const { mutate: login, isPending } = useLogin();
  const { login: setAuth } = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPasswordFormValues>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: LoginPasswordFormValues) {
    clearAuthCookies()

    login(
      { email, password: values.password, role },
      {
        onSuccess: async (response) => {
          const token = response?.token?.trim();

          if (!token) {
            toast.add({
              type: "error",
              description:
                "Este e-mail não está verificado. Redirecionando para a página de verificação...",
            });

            await delay(2000);
            onNotVerified();

            return;
          }
          setAuth(token, role);
          await queryClient.invalidateQueries({
            queryKey: ["current-user"],
          });
          onLoginSuccess(role);
        },
        onError: async (error: unknown) => {
          if (!axios.isAxiosError(error)) {
            toast.add({
              type: "error",
              description: "Ocorreu um erro inesperado. Tente novamente."
            });
            return;
          }

          const status = error.response?.status;

          switch (status) {
            case 401: {
              toast.add({
                type: "error",
                description: "E-mail ou senha inválidos. Tente novamente."
              });
              break;
            }
            case 403: {
              toast.add({
                type: "error",
                description: "Este e-mail não está verificado. Redirecionando para página de verificação...",
              });

              await delay(1500);
              onNotVerified();

              break;
            }
            default:
              toast.add({
                type: "error",
                description: "Ocorreu um erro inesperado.",
              });
          }
        },
      },
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle text="Entrar" className="flex py-2" />
        <CardDescription>
          Digite sua senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormField
              text="email"
              id="email"
              type="email"
              disabled={true}
              defaultValue={email}
            />
            <FormField
              text="senha"
              id="password"
              type="password"
              registration={register("password")}
              error={errors.password}
            />
            <FormButton
              disabled={isPending}
              text={isPending ? "Entrando..." : "Entrar"}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
