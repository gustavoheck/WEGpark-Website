"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";

import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import {
  profileSchema,
  ProfileFormValues,
  EmployeeProfileFormValues,
  VisitorProfileFormValues,
} from "../../schemas/ProfileSchema";
import { EmployeeProfileFields } from "../molecules/EmployeeProfileFields";
import { VisitorProfileFields } from "../molecules/VisitorProfileFields";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import { mapProfileUpdate } from "../../mappers/profileMapper";
import { VisitorProfile, CollaboratorProfile } from "../../types/Profile";

export function ProfileEditForm() {
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [isOpenInformative, setIsOpenInformative] = useState(false);

  const { data: profile, isPending: isLoadingProfile } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: profile
      ? profile.parkUserType === "VISITOR"
        ? {
            parkUserType: "VISITOR",
            name: profile.name,
            telephone: profile.telephone,
            email: profile.email,
            companyName: profile.companyName,
            cpf: profile.cpf,
          }
        : {
            parkUserType: "COLLABORATOR",
            name: profile.name,
            telephone: profile.telephone,
            department: profile.department,
            badgeNumber: profile.badgeNumber,
            email: profile.email,
          }
      : undefined,
  });

  useEffect(() => {
    if (!profile) return;

    const nextValues =
      profile.parkUserType === "VISITOR"
        ? {
            parkUserType: "VISITOR" as const,
            name: profile.name,
            telephone: profile.telephone,
            email: profile.email,
            companyName: profile.companyName,
            cpf: profile.cpf,
          }
        : {
            parkUserType: "COLLABORATOR" as const,
            name: profile.name,
            telephone: profile.telephone,
            department: profile.department,
            badgeNumber: profile.badgeNumber,
            email: profile.email,
          };

    reset(nextValues);
  }, [profile, reset]);

  const parkUserType = useWatch({ control, name: "parkUserType" });

  function handleConfirmEdit() {
    setIsOpenConfirmation(true);
  }

  function onSubmit(data: ProfileFormValues) {
    if (data.parkUserType === "VISITOR") {
      const visitorProfile: VisitorProfile = {
        uuid: profile!.uuid,
        email: profile!.email,
        name: data.name,
        telephone: data.telephone,
        parkUserType: "VISITOR",
        companyName: data.companyName,
        cpf: data.cpf,
      };

      updateProfile(mapProfileUpdate(visitorProfile), {
        onSuccess: () => {
          setIsOpenConfirmation(false);
          setIsOpenInformative(true);
        },
        onError: (error) => {
          setIsOpenConfirmation(false);
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Não foi possível atualizar o perfil.",
            ),
          });
        },
      });
      return;
    }

    const collaboratorProfile: CollaboratorProfile = {
      uuid: profile!.uuid,
      email: profile!.email,
      name: data.name,
      telephone: data.telephone,
      parkUserType: "COLLABORATOR",
      department: data.department,
      badgeNumber: data.badgeNumber,
    };

    updateProfile(mapProfileUpdate(collaboratorProfile), {
      onSuccess: () => {
        setIsOpenConfirmation(false);
        setIsOpenInformative(true);
      },
      onError: (error) => {
        setIsOpenConfirmation(false);
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Não foi possível atualizar o perfil.",
          ),
        });
      },
    });
  }

  if (isLoadingProfile || !profile) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <ProfilePicture
          name={profile.name}
          variant="secondary"
          className="w-40 h-40 text-6xl mb-8"
        />
      </div>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleConfirmEdit)}>
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
                disabled
              />
              <FormField
                text="telefone"
                id="telephone"
                registration={register("telephone")}
                error={errors.telephone}
              />

              {parkUserType === "VISITOR" ? (
                <VisitorProfileFields
                  register={
                    register as unknown as UseFormRegister<VisitorProfileFormValues>
                  }
                  errors={
                    errors as unknown as FieldErrors<VisitorProfileFormValues>
                  }
                />
              ) : (
                <EmployeeProfileFields
                  register={
                    register as unknown as UseFormRegister<EmployeeProfileFormValues>
                  }
                  errors={
                    errors as unknown as FieldErrors<EmployeeProfileFormValues>
                  }
                />
              )}
            </FieldGroup>

            <FormButton
              text="salvar alterações"
              disabled={!isDirty || !isValid}
            />

            <AlertDialogComponent
              open={isOpenConfirmation}
              onOpenChange={setIsOpenConfirmation}
              title="Salvar Alterações"
              description="Você deseja salvar as alterações feitas no seu perfil?"
              onClick={handleSubmit(onSubmit)}
              confirmText="Salvar"
            />

            <DialogComponent
              open={isOpenInformative}
              onOpenChange={setIsOpenInformative}
              title="Alterações Salvas"
              description="Os dados do seu perfil foram salvos com sucesso!"
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
