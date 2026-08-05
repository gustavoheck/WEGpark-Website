"use client";

import { useState, useEffect } from "react";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";

import { useCreateUser } from "../../hooks/useUserManagement";
import {
  createUserSchema,
  CreateUserFormValues,
  CreateEmployeeFormValues,
  CreateGuardFormValues,
  CreateHRFormValues,
  CreateVisitorFormValues,
} from "../../schemas/create/CreateUserSchema";
import { UserRole, CreateUserRequestDTO } from "../../types/User";
import { UserTypeSelector } from "../molecules/UserTypeSelector";
import { EmployeeFields } from "../molecules/fields/create/EmployeeFields";
import { GuardFields } from "../molecules/fields/create/GuardFields";
import { HRFields } from "../molecules/fields/create/HRFields";
import { VisitorFields } from "../molecules/fields/create/VisitorFields";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

export function CreateUserForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    mode: "all",
    shouldUnregister: true,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    },
  });

  const { mutate: createUser, isPending, error } = useCreateUser();

  function handleSelectRole(role: UserRole) {
    setValue("role", role, { shouldDirty: true });
    setSelectedRole(role);
  }

  useEffect(() => {
    if (selectedRole) {
      void trigger();
    }
  }, [selectedRole, trigger]);

  function handleConfirm() {
    setIsOpenConfirmation(true);
  }

  function onSubmit(data: CreateUserFormValues) {
    const { ...userData } = data;

    createUser(
      {
        ...userData,
        active: true,
      } as CreateUserRequestDTO,
      {
        onSuccess: () => {
          setIsOpenConfirmation(false);
          toast.add({
            type: "success",
            description: "Usuário cadastrado com sucesso!",
          });
          router.push("/gestao-usuarios");
        },
        onError: (error) => {
          setIsOpenConfirmation(false);
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Erro ao cadastrar o usuário. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(handleConfirm)}>
          <FieldGroup className="gap-4 mb-6">
            <FormField
              text="nome"
              id="name"
              registration={register("name")}
              error={errors.name}
            />
            <FormField
              text="email"
              id="email"
              type="email"
              registration={register("email")}
              error={errors.email}
            />
            <FormField
              text="telefone"
              id="phone"
              registration={register("phone")}
              error={errors.phone}
            />
            <FormField
              text="senha"
              id="password"
              type="password"
              registration={register("password")}
              error={errors.password}
            />
            <FormField
              text="confirmar senha"
              id="confirmPassword"
              type="password"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
            />

            <input type="hidden" {...register("role")} />
            <UserTypeSelector
              value={selectedRole}
              onChange={handleSelectRole}
            />

            {selectedRole === "EMPLOYEE" ? (
              <EmployeeFields
                register={
                  register as unknown as UseFormRegister<CreateEmployeeFormValues>
                }
                errors={
                  errors as unknown as FieldErrors<CreateEmployeeFormValues>
                }
              />
            ) : null}

            {selectedRole === "GUARD" ? (
              <GuardFields
                register={
                  register as unknown as UseFormRegister<CreateGuardFormValues>
                }
                errors={errors as unknown as FieldErrors<CreateGuardFormValues>}
              />
            ) : null}

            {selectedRole === "HR" ? (
              <HRFields
                register={
                  register as unknown as UseFormRegister<CreateHRFormValues>
                }
                errors={errors as unknown as FieldErrors<CreateHRFormValues>}
              />
            ) : null}

            {selectedRole === "VISITOR" ? (
              <VisitorFields
                register={
                  register as unknown as UseFormRegister<CreateVisitorFormValues>
                }
                errors={
                  errors as unknown as FieldErrors<CreateVisitorFormValues>
                }
              />
            ) : null}
          </FieldGroup>

          {error ? (
            <p className="text-sm text-destructive mb-4">
              Não foi possível criar o usuário. Verifique os dados e tente
              novamente.
            </p>
          ) : null}

          <FormButton
            text={isPending ? "cadastrando..." : "cadastrar usuário"}
            disabled={!selectedRole || isPending}
          />

          <AlertDialogComponent
            open={isOpenConfirmation}
            onOpenChange={setIsOpenConfirmation}
            title="Cadastrar Usuário"
            description="Confirma a criação desse usuário com os dados informados?"
            onClick={handleSubmit(onSubmit)}
            confirmText="Cadastrar"
          />
        </form>
      </CardContent>
    </Card>
  );
}
