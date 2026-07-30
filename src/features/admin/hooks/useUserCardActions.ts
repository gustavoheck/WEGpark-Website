import { useState } from "react";
import { useDeactivateUser, useActivateUser } from "./useUserManagement";
import { toast } from "@/components/ui/toast";

type ActiveDialog = "deactivate" | "activate" | null;

export function useUserCardActions(userId: string) {
    const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
    const { mutate: deactivateUser} = useDeactivateUser();
    const { mutate: activateUser} = useActivateUser();

    const handleDeactivate = () => {
        deactivateUser(userId, {
            onSuccess: () => {
                setActiveDialog(null);
                toast.add({ type: "success", description: "Usuário desativado com sucesso!" });
            },
            onError: () => {
                setActiveDialog(null);
                toast.add({ type: "error", description: "Erro ao desativar o usuário. Tente novamente." });
            },
        });
    };

    const handleActivate = () => {
        activateUser(userId, {
            onSuccess: () => {
                setActiveDialog(null);
                toast.add({ type: "success", description: "Usuário ativado com sucesso!" });
            },
            onError: () => {
                setActiveDialog(null);
                toast.add({ type: "error", description: "Erro ao ativar o usuário. Tente novamente." });
            },
        });
    };

    return {
        activeDialog,
        openDeactivateDialog: () => setActiveDialog("deactivate"),
        openActivateDialog: () => setActiveDialog("activate"),
        closeDialog: () => setActiveDialog(null),
        actions: {
            handleDeactivate,
            handleActivate
        }
    };
}