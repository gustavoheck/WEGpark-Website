import { useState } from "react";
import { useDelete } from "./useDelete";
import { toast } from "@/components/ui/toast"

type ActiveDialog = "delete" | "unlink" | null

export function useVehicleCardActions(vehicleUuid: string) {

    const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);

    const { mutate: deleteVehicle, isPending } = useDelete();


    const handleDelete = () => {
        deleteVehicle(
            { uuid: vehicleUuid },
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
            { uuid: vehicleUuid },
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
        isPending,
        actions: {
            handleDelete,
            handleUnlink,
        },
    }

}