import { useState } from "react";
import { toast } from "@/components/ui/toast"
import { useVehicle } from "./useVehicle";

type ActiveDialog = "delete" | "unlink" | null

export function useVehicleCardActions(vehicleUuid: string) {

    const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);

    const { deleteVehicle, isDeleting } = useVehicle();


    const handleDelete = () => {
        deleteVehicle(
            vehicleUuid,
            {
                onSuccess: () => {
                    setActiveDialog(null);
                    toast.add({ type: "success", description: "Veículo excluído com sucesso!" });
                },
                onError: () => {
                    setActiveDialog(null);
                    toast.add({ type: "error", description: "Erro ao excluir o veículo. Tente novamente." });
                },
            }
        );
    };

    const handleUnlink = () => {
        deleteVehicle(
            vehicleUuid,
            {
                onSuccess: () => {
                    setActiveDialog(null);
                    toast.add({ type: "success", description: "Veículo desvinculado com sucesso!" });
                },
                onError: () => {
                    setActiveDialog(null);
                    toast.add({ type: "error", description: "Erro ao desvincular o veículo. Tente novamente." });
                },
            }
        );
    };

    return {
        activeDialog,
        openDeleteDialog: () => setActiveDialog('delete'),
        openUnlinkDialog: () => setActiveDialog('unlink'),
        closeDialog: () => setActiveDialog(null),
        isDeleting,
        actions: {
            handleDelete,
            handleUnlink,
        },
    }

}