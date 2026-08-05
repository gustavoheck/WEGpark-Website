"use client";

import Link from "next/link";
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

import { useAuthAccountRoles } from "../../hooks/useAuthMutations";
import {
  CheckEmailFormValues,
  checkEmailSchema,
} from "../../schemas/auth.schema";

interface EmailLookupFormProps {
  onEmailChecked: (email: string, roles: SystemRoleType[]) => void;
}

export function EmailLookupForm({ onEmailChecked }: EmailLookupFormProps) {
  const { mutate: accountRoles, isPending } = useAuthAccountRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckEmailFormValues>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: { email: "" },
  });

  function onSubmit(values: CheckEmailFormValues) {
    accountRoles(
      { email: values.email },
      {
        onSuccess: (response) => {
          onEmailChecked(
            values.email,
            response.map((item) => item.role),
          );
        },
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Não foi possível continuar. Verifique o e-mail informado.",
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
          Digite seu e-mail para acessar sua conta.
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

            <Link
              href="/esqueceu-senha"
              className="w-fit text-sm text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>

            <p className="text-sm text-muted-foreground">
              Ainda não possui uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-sm text-primary hover:underline"
              >
                Cadastre-se aqui
              </Link>
            </p>

            <FormButton
              disabled={isPending}
              text={isPending ? "Verificando..." : "Continuar"}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
