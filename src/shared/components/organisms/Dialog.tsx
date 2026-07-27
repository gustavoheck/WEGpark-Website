import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface DialogProps {
    open : boolean
    onOpenChange : Dispatch<SetStateAction<boolean>>
    title : string
    description : string
}

export default function DialogComponent({open, onOpenChange, title, description} : DialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold mb-2 text-center">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-base w-full text-wrap text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className="text-lg font-semibold">Fechar</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}