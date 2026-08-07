import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useVehicle } from "./useVehicle";

export function useVehicleCardActions(vehicleUuid: string, isOwner: boolean) {
  const queryClient = useQueryClient();
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const { unlinkVehicle, isUnlinking } = useVehicle();

  function handleUnlink() {
    unlinkVehicle(vehicleUuid, {
      onSuccess: () => {
        setIsUnlinkDialogOpen(false);
        toast.add({
          type: "success",
          description: isOwner
            ? "Veículo excluído com sucesso!"
            : "Veículo desvinculado com sucesso!",
        });
        void queryClient.invalidateQueries({ queryKey: ["vehicle"] });
      },
      onError: (error) => {
        setIsUnlinkDialogOpen(false);
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            isOwner
              ? "Erro ao excluir o veículo. Tente novamente."
              : "Erro ao desvincular o veículo. Tente novamente.",
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
