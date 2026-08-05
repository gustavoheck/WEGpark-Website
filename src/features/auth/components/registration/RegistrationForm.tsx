"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
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
import { ParkUserType } from "@/shared/enum/ParkUserType";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useRegister } from "../../hooks/useAuthMutations";
import { RegisterFormValues, registerSchema } from "../../schemas/auth.schema";
import { RegisterRequest } from "../../types/auth.type";
import { CollaboratorRegistrationFields } from "./CollaboratorRegistrationFields";
import { ParkUserTypeSelector } from "./ParkUserTypeSelector";
import { VisitorRegistrationFields } from "./VisitorRegistrationFields";

interface RegistrationFormProps {
  onRegistered: (email: string) => void;
}

export function RegistrationForm({ onRegistered }: RegistrationFormProps) {
  const { mutate: register, isPending } = useRegister();

  const methods = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const {
    register: registerField,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;
  const userType = useWatch({ control, name: "type" }) as
    ParkUserType | undefined;

  function handleSelectType(type: ParkUserType) {
    setValue("type", type as RegisterFormValues["type"], {
      shouldValidate: true,
    });
  }

  function onSubmit(values: RegisterFormValues) {
    if (!values.type) {
      return;
    }

    const defaults = { email: values.email, password: values.password };
    const parkUserDefaults = {
      name: values.name,
      telephone: values.telephone,
    };
    const request: RegisterRequest =
      values.type === "COLLABORATOR"
        ? {
            defaults,
            parkUserDefaults,
            badgeNumber: values.badgeNumber,
            location: values.location,
          }
        : {
            defaults,
            parkUserDefaults,
            company: values.company,
            cpf: values.cpf,
          };

    register(
      { request, userType: values.type as ParkUserType },
      {
        onSuccess: () => {
          onRegistered(values.email);
          toast.add({
            type: "success",
            description: "Cadastro realizado com sucesso!",
          });
        },
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Erro ao realizar cadastro.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle className="flex py-2" text="cadastrar-se" />
        <CardDescription>
          Insira seus dados para se cadastrar no WEGpark.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormField
                text="nome completo"
                id="name"
                registration={registerField("name")}
                error={errors.name}
              />
              <FormField
                text="telefone"
                id="telephone"
                registration={registerField("telephone")}
                error={errors.telephone}
              />
              <FormField
                text="email"
                id="email"
                registration={registerField("email")}
                error={errors.email}
              />
              <FormField
                text="senha"
                id="password"
                type="password"
                registration={registerField("password")}
                error={errors.password}
              />
              <FormField
                text="confirmar senha"
                id="confirm-password"
                type="password"
                registration={registerField("confirmPassword")}
                error={errors.confirmPassword}
              />

              <ParkUserTypeSelector
                value={userType ?? null}
                onChangeParkUser={handleSelectType}
              />

              {userType === "COLLABORATOR" ? (
                <CollaboratorRegistrationFields />
              ) : null}

              {userType === "VISITOR" ? <VisitorRegistrationFields /> : null}

              <FormButton
                disabled={!userType || isPending}
                text={isPending ? "Enviando..." : "Cadastrar"}
              />
            </FieldGroup>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
