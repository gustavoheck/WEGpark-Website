import { useState } from "react";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";
import { UserRole } from "../types/User";

import { useActivateUser, useDeactivateUser } from "./useUserManagement";

type ActiveDialog = "deactivate" | "activate" | null;

export function useUserCardActions(userId: string, role: UserRole) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
  const { mutate: deactivateUser } = useDeactivateUser();
  const { mutate: activateUser } = useActivateUser();

  function handleDeactivate() {
    deactivateUser({ id: userId, role }, {
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
    activateUser({ id: userId, role }, {
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
