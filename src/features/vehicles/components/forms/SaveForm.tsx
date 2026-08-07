"use client";

import { FieldGroup } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { VehicleFormData, vehicleSchema } from "../../schemas/VehicleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../../shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import { useState } from "react";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useVehicle } from "../../hooks/useVehicle";
import { mapFormDataToVehicleRequest } from "../../mappers/vehicleMapper";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function SaveForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isOpenConfirmationNormal, setIsOpenConfirmationNormal] =
    useState(false);
  const [isOpenConfirmationLink, setIsOpenConfirmationLink] = useState(false);
  const {
    createVehicle,
    requestVehicleAssociation,
    isCreating,
    isRequestingVehicleAssociation,
  } = useVehicle();
  const [plate, setPlate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    mode: "onChange",
  });

  function onSubmit(data: VehicleFormData) {
    const request = mapFormDataToVehicleRequest(data);

    createVehicle(request, {
      onSuccess: () => {
        setIsOpenConfirmationNormal(false);
        toast.add({
          type: "success",
          description: "Veículo cadastrado com sucesso!",
        });
        router.replace("/veiculos");
      },
      onError: (error: unknown) => {
        if (!axios.isAxiosError(error)) {
          toast.add({
            type: "error",
            description: "Ocorreu um erro inesperado. Tente novamente.",
          });
          return;
        }

        setIsOpenConfirmationNormal(false);

        const status = error.response?.status;

        switch (status) {
          case 409: {
            setPlate(request.plate);
            setIsOpenConfirmationLink(true);

            break;
          }
          default:
            toast.add({
              type: "error",
              description: "Erro ao cadastrar veículo. Tente novamente",
            });
        }
      },
    });
  }

  function handleRequestOwnership() {
    requestVehicleAssociation(
      { plate: plate },
      {
        onSuccess: async () => {
          setIsOpenConfirmationLink(false);
          toast.add({
            type: "info",
            description: "Proprietário notificado. Aguarde a resposta.",
          });

          await queryClient.invalidateQueries({
            queryKey: ["current-user"],
          });
          await queryClient.invalidateQueries({
            queryKey: ["requests", "vehicle-association"],
          });
          router.replace("/veiculos");
        },
        onError: () => {
          toast.add({
            type: "error",
            description: "Erro ao notificar proprietário. Tente novamente.",
          });
        },
      },
    );
  }

  function handleOpenConfirmation() {
    setIsOpenConfirmationNormal(true);
  }

  return (
    <Card
      size="sm"
      className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
    >
      <CardHeader className="border-b bg-muted/20 pb-4">
        <CardTitle>Dados do veículo</CardTitle>
        <CardDescription>
          Informe as características que identificam o veículo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleOpenConfirmation)}>
          <FieldGroup className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              text="placa"
              id="plate"
              registration={register("plate")}
              error={errors.plate}
            />
            <FormField
              text="marca"
              id="brand"
              registration={register("brand")}
              error={errors.brand}
            />
            <FormField
              text="modelo"
              id="model"
              registration={register("model")}
              error={errors.model}
            />
            <FormField
              text="cor"
              id="color"
              registration={register("color")}
              error={errors.color}
            />
          </FieldGroup>
          <FormButton
            desktopCompact
            text="cadastrar veículo"
            disabled={!isValid}
          />
          <AlertDialogComponent
            open={isOpenConfirmationNormal}
            onOpenChange={setIsOpenConfirmationNormal}
            title="Cadastrar Veículo"
            description="Você realmente deseja cadastrar este veículo?"
            onClick={handleSubmit(onSubmit)}
            confirmText="Cadastrar"
            pending={isCreating}
          />
          <AlertDialogComponent
            open={isOpenConfirmationLink}
            onOpenChange={setIsOpenConfirmationLink}
            title="Veículo já Existente"
            description="Esse veículo já está cadastrado no sistema, deseja mandar uma notificação ao proprietário para se tornar um usuário?"
            onClick={handleRequestOwnership}
            confirmText="Solicitar"
            pending={isRequestingVehicleAssociation}
          />
        </form>
      </CardContent>
    </Card>
  );
}
