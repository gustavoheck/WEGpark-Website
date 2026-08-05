import { useState } from "react";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useVehicle } from "./useVehicle";

export function useVehicleCardActions(vehicleUuid: string) {
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const { unlinkVehicle, isUnlinking } = useVehicle();

  function handleUnlink() {
    unlinkVehicle(vehicleUuid, {
      onSuccess: () => {
        setIsUnlinkDialogOpen(false);
        toast.add({
          type: "success",
          description: "Veículo desvinculado com sucesso!",
        });
      },
      onError: (error) => {
        setIsUnlinkDialogOpen(false);
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Erro ao desvincular o veículo. Tente novamente.",
          ),
        });
      },
    });
  }

  return {
    isUnlinkDialogOpen,
    setIsUnlinkDialogOpen,
    handleUnlink,
    isUnlinking,
  };
}
