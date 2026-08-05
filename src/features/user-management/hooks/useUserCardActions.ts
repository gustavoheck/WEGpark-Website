import { useState } from "react";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useActivateUser, useDeactivateUser } from "./useUserManagement";

type ActiveDialog = "deactivate" | "activate" | null;

export function useUserCardActions(userId: string) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const { mutate: deactivateUser } = useDeactivateUser();
  const { mutate: activateUser } = useActivateUser();

  function handleDeactivate() {
    deactivateUser(userId, {
      onSuccess: () => {
        setActiveDialog(null);
        toast.add({
          type: "success",
          description: "Usuário desativado com sucesso!",
        });
      },
      onError: (error) => {
        setActiveDialog(null);
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Erro ao desativar o usuário. Tente novamente.",
          ),
        });
      },
    });
  }

  function handleActivate() {
    activateUser(userId, {
      onSuccess: () => {
        setActiveDialog(null);
        toast.add({
          type: "success",
          description: "Usuário ativado com sucesso!",
        });
      },
      onError: (error) => {
        setActiveDialog(null);
        toast.add({
          type: "error",
          description: getApiErrorMessage(
            error,
            "Erro ao ativar o usuário. Tente novamente.",
          ),
        });
      },
    });
  }

  return {
    activeDialog,
    openDeactivateDialog: () => setActiveDialog("deactivate"),
    openActivateDialog: () => setActiveDialog("activate"),
    closeDialog: () => setActiveDialog(null),
    actions: {
      handleDeactivate,
      handleActivate,
    },
  };
}
