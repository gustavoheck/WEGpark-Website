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
import { useAuth } from "@/shared/context/AuthContext";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useLogin } from "../../hooks/useAuthMutations";
import {
  LoginPasswordFormValues,
  loginPasswordSchema,
} from "../../schemas/auth.schema";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPasswordFormValues>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: { password: "" },
  });

  function onSubmit(values: LoginPasswordFormValues) {
    login(
      { email, password: values.password, role },
      {
        onSuccess: (response) => {
          const jwtToken = response.token;

          if (!jwtToken) {
            onNotVerified();
            return;
          }

          setAuth(jwtToken, role);
          onLoginSuccess(role);
        },
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "E-mail ou senha inválidos.",
            ),
          });
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
