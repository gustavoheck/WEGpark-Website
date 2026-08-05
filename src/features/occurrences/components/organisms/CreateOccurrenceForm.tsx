"use client";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import Vehicle from "@/shared/types/Vehicle";
import VehicleListMock from "@/shared/mocks/VehicleListMock";
import { PARKING_SPACE_MAP } from "../../enums/parking-space-map";
import { WARNING_TYPE_MAP } from "../../enums/warning-type";
import {
  CreateOccurrenceFormValues,
  createOccurrenceSchema,
} from "../../schemas/CreateOccurrenceSchema";
import { useCreateOccurrence } from "../../hooks/useCreateOccurrence";
import { OccurrenceTypeSelector } from "../molecules/OccurrenceTypeSelector";
import { AlertDialogAction } from "@/components/ui/alert-dialog";

export default function CreateOccurrenceForm() {
  const router = useRouter();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [foundVehicle, setFoundVehicle] = useState<Vehicle | null>(null);
  const [vehicleDialog, setVehicleDialog] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [searching, setSearching] = useState(false);
  const { mutate: createOccurrence, isPending } = useCreateOccurrence();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<CreateOccurrenceFormValues>({
    resolver: zodResolver(createOccurrenceSchema),
    mode: "onChange",
    shouldUnregister: true,
    defaultValues: { plate: "", location: "", gate: "", description: "" },
  });

  const occurrenceType = useWatch({ control, name: "occurrenceType" });
  const plateValue = useWatch({ control, name: "plate" });
  const warningType = useWatch({ control, name: "warningType" });
  const parkingSpaceType = useWatch({ control, name: "parkingSpaceType" });

  async function searchVehicle() {
    const plate = plateValue.trim();

    if (!plate) {
      await trigger("plate");
      return;
    }

    setSearching(true);

    try {
      const mockVehicle = VehicleListMock.find(
        (item) => item.plate.toUpperCase() === plate.toUpperCase(),
      );

      if (!mockVehicle) throw new Error("Vehicle not found");

      setFoundVehicle(mockVehicle);
      setVehicleDialog(true);
    } catch {
      toast.add({
        type: "error",
        description: "Veículo não encontrado. Confira a placa informada.",
      });
    } finally {
      setSearching(false);
    }
  }

  function submit(data: CreateOccurrenceFormValues) {
    if (!vehicle) return;

    createOccurrence(
      { data, vehicleId: vehicle.uuid },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Ocorrência registrada com sucesso!",
          });
          router.push("/ocorrencias");
        },
        onError: (error) => {
          setConfirmation(false);
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
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(() => setConfirmation(true))}>
          <FieldGroup className="mb-6 gap-4">
            {/*Parte inicial da busca por placa*/}
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <FormField
                  text="placa"
                  id="plate"
                  registration={register("plate")}
                  error={errors.plate}
                  disabled={!!vehicle}
                />
              </div>
              <Button
                type="button"
                onClick={searchVehicle}
                disabled={!!vehicle || searching}
                className="py-5"
              >
                <Search />
                {searching ? "Buscando..." : "Buscar veículo"}
              </Button>
            </div>

            {vehicle ? (
              <>
                <div className="rounded-lg border bg-muted/40 p-4">
                  <p className="font-semibold">Veículo confirmado</p>
                  <p className="text-sm text-muted-foreground">
                    {vehicle.plate} · {vehicle.brand} {vehicle.model} ·{" "}
                    {vehicle.color}
                  </p>
                  <Button
                    type="button"
                    variant="link"
                    className="px-0"
                    onClick={() => setVehicle(null)}
                  >
                    Alterar veículo
                  </Button>
                </div>
                <FormField
                  text="local / parque"
                  id="location"
                  registration={register("location")}
                  error={errors.location}
                />
                <FormField
                  text="portaria"
                  id="gate"
                  registration={register("gate")}
                  error={errors.gate}
                />
                <input type="hidden" {...register("occurrenceType")} />
                <OccurrenceTypeSelector
                  value={occurrenceType}
                  onChange={(type) =>
                    setValue("occurrenceType", type, { shouldValidate: true })
                  }
                />

                {errors.occurrenceType && (
                  <p className="text-sm text-destructive">
                    {errors.occurrenceType.message}
                  </p>
                )}

                {occurrenceType === "WARNING" && (
                  <>
                    <SelectField
                      label="tipo do aviso"
                      value={warningType}
                      onChange={(value) =>
                        setValue("warningType", value, { shouldValidate: true })
                      }
                      error={errors.warningType?.message}
                      options={WARNING_TYPE_MAP}
                    />
                    <FormField
                      text="descrição"
                      id="description"
                      registration={register("description")}
                      error={errors.description}
                    />
                  </>
                )}
                {occurrenceType === "ILLEGAL_PARKING" && (
                  <>
                    <SelectField
                      label="tipo de vaga"
                      value={parkingSpaceType}
                      onChange={(value) =>
                        setValue("parkingSpaceType", value, {
                          shouldValidate: true,
                        })
                      }
                      error={errors.parkingSpaceType?.message}
                      options={PARKING_SPACE_MAP}
                    />
                    <FormField
                      text="descrição"
                      id="description"
                      registration={register("description")}
                      error={errors.description}
                    />
                  </>
                )}
                {occurrenceType === "TRAFFIC_ACCIDENT" && (
                  <>
                    <FormField
                      text="data/hora do ocorrido"
                      id="occurrenceDate"
                      type="datetime-local"
                      registration={register("occurrenceDate")}
                      error={errors.occurrenceDate}
                    />
                    <FormField
                      text="tipo de ocorrência"
                      id="trafficOccurrenceType"
                      registration={register("trafficOccurrenceType")}
                      error={errors.trafficOccurrenceType}
                    />
                    <FormField
                      text="nome da vítima"
                      id="victimName"
                      registration={register("victimName")}
                      error={errors.victimName}
                    />
                    <FormField
                      text="chefe responsável"
                      id="responsibleBossName"
                      registration={register("responsibleBossName")}
                      error={errors.responsibleBossName}
                    />
                    <FormField
                      text="fábrica responsável"
                      id="responsibleFactory"
                      registration={register("responsibleFactory")}
                      error={errors.responsibleFactory}
                    />
                    <FormField
                      text="seção responsável"
                      id="responsibleSection"
                      registration={register("responsibleSection")}
                      error={errors.responsibleSection}
                    />
                    <FormField
                      text="depoimento do guarita"
                      id="guardTestimony"
                      registration={register("guardTestimony")}
                      error={errors.guardTestimony}
                    />
                    <FormField
                      text="relato da vítima"
                      id="victimTestimony"
                      registration={register("victimTestimony")}
                      error={errors.victimTestimony}
                    />
                  </>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                Busque e confirme o veículo para preencher os dados da
                ocorrência.
              </p>
            )}
          </FieldGroup>
          <FormButton
            text={isPending ? "registrando..." : "registrar ocorrência"}
            disabled={!vehicle || !occurrenceType || !isValid || isPending}
          />
        </form>

        <Dialog open={vehicleDialog} onOpenChange={setVehicleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar veículo</DialogTitle>
              <DialogDescription>
                Esta é a identificação do veículo informado?
              </DialogDescription>
            </DialogHeader>
            {foundVehicle && (
              <div className="rounded-lg bg-muted p-4 text-sm">
                <p className="font-bold"> Placa: {foundVehicle.plate}</p>
                <p className="font-bold"> Marca: {foundVehicle.brand}</p>
                <p className="font-bold"> Modelo: {foundVehicle.model}</p>
                <p className="font-bold"> Cor: {foundVehicle.color} </p>
              </div>
            )}
            <DialogFooter>
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="py-5 text-lg font-semibold"
                  />
                }
              >
                Cancelar
              </DialogClose>

              <AlertDialogAction
                onClick={() => {
                  setVehicle(foundVehicle);
                  setFoundVehicle(null);
                  setVehicleDialog(false);
                }}
                className="py-5 text-lg font-semibold disabled:bg-muted"
                disabled={isPending}
              >
                Confirmar veículo
              </AlertDialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialogComponent
          open={confirmation}
          onOpenChange={setConfirmation}
          title="Registrar ocorrência"
          description="Confirma o registro desta ocorrência para o veículo selecionado?"
          onClick={handleSubmit(submit)}
          confirmText="Registrar"
          pending={isPending}
        />
      </CardContent>
    </Card>
  );
}

function SelectField({
  label,
  value,
  onChange,
  error,
  options,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  options: Record<string, string>;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-lg font-semibold capitalize">{label}</span>
      <Select
        value={value || null}
        onValueChange={(nextValue) => onChange(nextValue ?? "")}
      >
        <SelectTrigger
          className="h-auto w-full py-5 text-lg"
          aria-invalid={!!error}
        >
          <SelectValue placeholder="Selecione uma opção">
            {value ? options[value] : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(options).map(([optionValue, text]) => (
              <SelectItem
                key={optionValue}
                value={optionValue}
                className="py-3 text-lg"
              >
                {text}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}
