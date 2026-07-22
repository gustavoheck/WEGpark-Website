import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction } from "react";

interface AlertDialogProps {
    open : boolean
    onOpenChange : Dispatch<SetStateAction<boolean>>
    onClick: () => void
    title : string,
    description : string,
    confirmText : string
}

export default function AlertDialogComponent({open, onOpenChange, onClick, title, description, confirmText} : AlertDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl font-bold mb-2">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base w-full text-wrap text-center">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="py-5 text-lg font-semibold">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onClick}
                        className="py-5 text-lg font-semibold"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}