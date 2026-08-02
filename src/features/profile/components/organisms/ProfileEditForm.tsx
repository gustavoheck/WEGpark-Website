"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { FieldGroup } from "@/components/ui/field";
import { Card, CardContent } from "@/components/ui/card";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";
import SectionTitle from "@/shared/components/atoms/SectionTitle";

import { useProfile } from "../../hooks/useProfile";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";
import { profileSchema, ProfileFormValues, EmployeeProfileFormValues, VisitorProfileFormValues } from "../../schemas/ProfileSchema";
import { EmployeeProfileFields } from "../molecules/EmployeeProfileFields";
import { VisitorProfileFields } from "../molecules/VisitorProfileFields";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";

export function ProfileEditForm() {
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [isOpenInformative, setIsOpenInformative] = useState(false);

    const { data: profile, isPending: isLoadingProfile } = useProfile();
    const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        mode: "onChange",
        values: profile
            ? profile.role === "VISITOR"
                ? { role: "VISITOR", name: profile.name, companyName: profile.companyName }
                : { role: "COLLABORATOR", name: profile.name, department: profile.department, badgeNumber: profile.badgeNumber, email: profile.email }
            : undefined,
    });

    function handleConfirmEdit() {
        setIsOpenConfirmation(true);
    }

    function onSubmit(data: ProfileFormValues) {
        const { role, ...updateData } = data;
        updateProfile(updateData, {
            onSuccess: () => {
                setIsOpenConfirmation(false);
                setIsOpenInformative(true);
            },
            onError: () => {
                setIsOpenConfirmation(false);
                alert("Erro!");
            },
        });
    }

    if (isLoadingProfile || !profile) {
        return null;
    }

    return (
        <>
            <SectionTitle text="Editar Informações" />
            <div className="flex flex-col items-center">
                <ProfilePicture name={profile.name} variant="secondary" className="w-40 h-40 text-6xl mb-8"/>
            </div>
            <Card>
                <CardContent>
                    <form onSubmit={handleSubmit(handleConfirmEdit)}>
                        <FieldGroup className="gap-4 mb-6">
                            <FormField text="nome" id="name" registration={register("name")} error={errors.name} />

                            {profile.role === "VISITOR" ? (
                                <VisitorProfileFields
                                    register={register as unknown as UseFormRegister<VisitorProfileFormValues>}
                                    errors={errors as unknown as FieldErrors<VisitorProfileFormValues>}
                                    cpf={profile.cpf}
                                />
                            ) : (
                                <EmployeeProfileFields
                                    register={register as unknown as UseFormRegister<EmployeeProfileFormValues>}
                                    errors={errors as unknown as FieldErrors<EmployeeProfileFormValues>}
                                />
                            )}
                        </FieldGroup>

                        <FormButton text="salvar alterações" disabled={!isDirty || !isValid} />

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
