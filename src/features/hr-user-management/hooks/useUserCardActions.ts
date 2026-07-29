import { useState } from "react";
import { useDeleteUser } from "./useUserManagement";
import { toast } from "@/components/ui/toast";

type ActiveDialog = "delete" | null;

export function useUserCardActions(userId: string) {
    const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);
    const { mutate: deleteUser, isPending } = useDeleteUser();

    const handleDelete = () => {
        deleteUser(userId, {
            onSuccess: () => {
                setActiveDialog(null);
                toast.add({ type: "success", description: "Usuário excluído com sucesso!" });
            },
            onError: () => {
                setActiveDialog(null);
                toast.add({ type: "error", description: "Erro ao excluir o usuário. Tente novamente." });
            },
        });
    };

    return {
        activeDialog,
        openDeleteDialog: () => setActiveDialog("delete"),
        closeDialog: () => setActiveDialog(null),
        isPending,
        handleDelete,
    };
}