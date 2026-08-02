import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useVehicle } from "./useVehicle";

export function useVehicleCardActions(vehicleUuid: string) {
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const { unlinkVehicle, isUnlinking } = useVehicle();

  const handleUnlink = () => {
    unlinkVehicle(vehicleUuid, {
      onSuccess: () => {
        setIsUnlinkDialogOpen(false);
        toast.add({ type: "success", description: "Veículo desvinculado com sucesso!" });
      },
      onError: () => {
        setIsUnlinkDialogOpen(false);
        toast.add({ type: "error", description: "Erro ao desvincular o veículo. Tente novamente." });
      },
    });
  };

  return { isUnlinkDialogOpen, setIsUnlinkDialogOpen, handleUnlink, isUnlinking };
}
