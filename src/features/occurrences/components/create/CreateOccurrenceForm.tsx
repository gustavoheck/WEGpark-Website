"use client";

import { useState } from "react";
import {
  FormProvider,
  type Resolver,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";

import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import type Vehicle from "@/shared/types/Vehicle";
import { useFindVehicleByPlate } from "@/features/vehicles/hooks/useFindVehicleByPlate";

import { useCreate } from "../../hooks/useOccurrence";
import { mapCreateFormDataToEntity } from "../../mappers/occurrence.mapper";
import {
  createOccurrenceSchema,
  type OccurrenceFormValues,
} from "../../schemas/OccurrenceSchema";
import type { OccurrenceFormInput } from "../../types/occurrence-form.type";
import VehicleSearchField from "./VehicleSearchField";
import ConfirmedVehicleCard from "./ConfirmedVehicleCard";
import OccurrenceDetailsFields from "./OccurrenceDetailsField";
import VehicleConfirmationDialog from "./VehicleConfirmationDialog";

const occurrenceFormResolver = zodResolver(
  createOccurrenceSchema,
) as unknown as Resolver<OccurrenceFormInput>;

export default function CreateOccurrenceForm() {
  const router = useRouter();

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [foundVehicle, setFoundVehicle] = useState<Vehicle | null>(null);
  const [isVehicleDialogOpen, setIsVehicleDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const { mutate: createOccurrence, isPending } = useCreate();
  const { mutateAsync: findVehicleByPlate, isPending: isSearching } =
    useFindVehicleByPlate();

  const form = useForm<OccurrenceFormInput>({
    resolver: occurrenceFormResolver,
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: {
      plate: "",
      location: "",
      gate: "",
      description: "",
    },
  });

  const occurrenceType = useWatch({
    control: form.control,
    name: "occurrenceType",
  });

  const plate = useWatch({
    control: form.control,
    name: "plate",
  });

  async function searchVehicle() {
    const normalizedPlate = plate.trim();

    if (!normalizedPlate) {
      await form.trigger("plate");
      return;
    }

    try {
      const found = await findVehicleByPlate(normalizedPlate);

      if (!found) {
        toast.add({
          type: "error",
          description: "Veículo não encontrado. Confira a placa informada.",
        });
        return;
      }

      form.setValue("plate", found.plate, { shouldValidate: true });
      setFoundVehicle(found);
      setIsVehicleDialogOpen(true);
    } catch (error) {
      toast.add({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Não foi possível buscar o veículo. Tente novamente.",
        ),
      });
    }
  }
  function confirmVehicle() {
    if (!foundVehicle) return;

    setVehicle(foundVehicle);
    setFoundVehicle(null);
    setIsVehicleDialogOpen(false);
  }

  function changeVehicle() {
    setVehicle(null);
  }

  function handleVehicleDialogChange(open: boolean) {
    setIsVehicleDialogOpen(open);

    if (!open) {
      setFoundVehicle(null);
    }
  }

  function openConfirmation() {
    setIsConfirmationOpen(true);
  }

  function submit(formData: OccurrenceFormInput) {
    const validatedData: OccurrenceFormValues =
      createOccurrenceSchema.parse(formData);

    const request = mapCreateFormDataToEntity(validatedData);

    createOccurrence(
      {
        request,
        occurrenceType: validatedData.occurrenceType,
      },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Ocorrência registrada com sucesso!",
          });

          router.replace("/ocorrencias");
        },
        onError: (error) => {
          setIsConfirmationOpen(false);

          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Não foi possível registrar a ocorrência. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <FormProvider {...form}>
      <Card
        size="sm"
        className="mx-auto w-full max-w-5xl border-border/70 shadow-sm"
      >
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle>Dados da ocorrência</CardTitle>
          <CardDescription>
            Confirme o veículo e registre as informações do ocorrido.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(openConfirmation)}>
            <FieldGroup className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <VehicleSearchField
                disabled={Boolean(vehicle)}
                searching={isSearching}
                onSearch={searchVehicle}
              />

              {!vehicle && (
                <p className="text-sm text-muted-foreground md:col-span-2">
                  Busque e confirme o veículo para preencher os dados da
                  ocorrência.
                </p>
              )}

              {vehicle && (
                <>
                  <ConfirmedVehicleCard
                    vehicle={vehicle}
                    onChangeVehicle={changeVehicle}
                  />

                  <OccurrenceDetailsFields />
                </>
              )}
            </FieldGroup>

            <FormButton
              desktopCompact
              text={isPending ? "Registrando..." : "Registrar ocorrência"}
              disabled={
                !vehicle ||
                !occurrenceType ||
                !form.formState.isValid ||
                isPending
              }
            />
          </form>

          <VehicleConfirmationDialog
            open={isVehicleDialogOpen}
            vehicle={foundVehicle}
            onOpenChange={handleVehicleDialogChange}
            onConfirm={confirmVehicle}
          />

          <AlertDialogComponent
            open={isConfirmationOpen}
            onOpenChange={setIsConfirmationOpen}
            title="Registrar ocorrência"
            description="Confirma o registro desta ocorrência para o veículo selecionado?"
            onClick={form.handleSubmit(submit)}
            confirmText="Registrar"
            pending={isPending}
          />
        </CardContent>
      </Card>
    </FormProvider>
  );
}
