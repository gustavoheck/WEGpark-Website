"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";

import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import {
  profileSchema,
  ProfileFormValues,
  EmployeeProfileFormValues,
  RhProfileFormValues,
  VisitorProfileFormValues,
} from "../../schemas/ProfileSchema";
import { EmployeeProfileFields } from "../molecules/EmployeeProfileFields";
import { RhProfileFields } from "../molecules/RhProfileFields";
import { VisitorProfileFields } from "../molecules/VisitorProfileFields";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import { mapProfileUpdate } from "../../mappers/profileMapper";
import {
  CollaboratorProfile,
  Profile,
  RhProfile,
  VisitorProfile,
} from "../../types/Profile";

function toProfileFormValues(profile: Profile): ProfileFormValues {
  if (profile.parkUserType === "GUARD") {
    return {
      parkUserType: "COLLABORATOR",
      name: profile.name,
      telephone: profile.telephone,
      email: profile.email,
      department: profile.location,
      badgeNumber: profile.badgeNumber,
    };
  }

  if (profile.parkUserType === "RH") {
    return {
      parkUserType: "RH",
      name: profile.name,
      telephone: profile.telephone,
      email: profile.email,
      badgeNumber: profile.badgeNumber,
    };
  }

  if (profile.parkUserType === "VISITOR") {
    return {
      parkUserType: "VISITOR",
      name: profile.name,
      telephone: profile.telephone,
      email: profile.email,
      companyName: profile.companyName,
      cpf: profile.cpf,
    };
  }

  return {
    parkUserType: "COLLABORATOR",
    name: profile.name,
    telephone: profile.telephone,
    department: profile.department,
    badgeNumber: profile.badgeNumber,
    email: profile.email,
  };
}

export function ProfileEditForm() {
  const router = useRouter();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const { data: profile, isPending: isLoadingProfile } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: profile ? toProfileFormValues(profile) : undefined,
  });

  useEffect(() => {
    if (!profile) return;

    reset(toProfileFormValues(profile));
  }, [profile, reset]);

  const parkUserType = useWatch({ control, name: "parkUserType" });

  function handleConfirmEdit() {
    setIsOpenConfirmation(true);
  }

  function handleUpdateSuccess() {
    setIsOpenConfirmation(false);
    toast.add({
      type: "success",
      description: "Perfil atualizado com sucesso!",
    });
    router.push("/perfil");
  }

  function handleUpdateError(error: unknown) {
    setIsOpenConfirmation(false);
    toast.add({
      type: "error",
      description: getApiErrorMessage(
        error,
        "Não foi possível atualizar o perfil.",
      ),
    });
  }

  function onSubmit(data: ProfileFormValues) {
    if (!profile) return;

    if (data.parkUserType === "RH") {
      const rhProfile: RhProfile = {
        uuid: profile.uuid,
        email: profile.email,
        name: data.name,
        telephone: data.telephone,
        parkUserType: "RH",
        badgeNumber: data.badgeNumber,
      };

      updateProfile(mapProfileUpdate(rhProfile), {
        onSuccess: handleUpdateSuccess,
        onError: handleUpdateError,
      });
      return;
    }

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
        onSuccess: handleUpdateSuccess,
        onError: handleUpdateError,
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
      onSuccess: handleUpdateSuccess,
      onError: handleUpdateError,
    });
  }

  if (isLoadingProfile || !profile) {
    return null;
  }

  if (profile.parkUserType === "GUARD") {
    return (
      <Card
        size="sm"
        className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
      >
        <CardContent className="py-8 text-center text-muted-foreground">
          A edição do perfil da guarita ainda não está disponível na API.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <ProfilePicture
          name={profile.name}
          variant="secondary"
          className="mb-5 h-28 w-28 text-4xl"
        />
      </div>
      <Card
        size="sm"
        className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
      >
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle>Informações pessoais</CardTitle>
          <CardDescription>
            Mantenha seus dados de identificação atualizados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleConfirmEdit)}>
            <FieldGroup className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                readOnly
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
              ) : parkUserType === "RH" ? (
                <RhProfileFields
                  register={
                    register as unknown as UseFormRegister<RhProfileFormValues>
                  }
                  errors={errors as unknown as FieldErrors<RhProfileFormValues>}
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
              desktopCompact
              text="salvar alterações"
              disabled={!isDirty}
            />

            <AlertDialogComponent
              open={isOpenConfirmation}
              onOpenChange={setIsOpenConfirmation}
              title="Salvar Alterações"
              description="Você deseja salvar as alterações feitas no seu perfil?"
              onClick={handleSubmit(onSubmit)}
              confirmText="Salvar"
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
}
