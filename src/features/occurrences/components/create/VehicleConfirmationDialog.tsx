import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type Vehicle from "@/shared/types/Vehicle";

type VehicleConfirmationDialogProps = {
  open: boolean;
  vehicle: Vehicle | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function VehicleConfirmationDialog({
  open,
  vehicle,
  onOpenChange,
  onConfirm,
}: VehicleConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar veículo</DialogTitle>

          <DialogDescription>
            Esta é a identificação do veículo informado?
          </DialogDescription>
        </DialogHeader>

        {vehicle && (
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p>
              <strong>Placa:</strong> {vehicle.plate}
            </p>
            <p>
              <strong>Marca:</strong> {vehicle.brand}
            </p>
            <p>
              <strong>Modelo:</strong> {vehicle.model}
            </p>
            <p>
              <strong>Cor:</strong> {vehicle.color}
            </p>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button type="button" onClick={onConfirm} disabled={!vehicle}>
            Confirmar veículo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}