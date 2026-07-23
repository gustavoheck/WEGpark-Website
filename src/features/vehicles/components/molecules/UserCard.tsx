"use client"

import { Card, CardHeader } from "@/components/ui/card";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import User from "@/shared/types/User";
import { Unlink } from "lucide-react";
import VehicleCardButton from "../atoms/VehicleCardButton";
import { useState } from "react";
import AlertDialogComponent from "@/shared/components/organisms/AlertDialog";
import DialogComponent from "@/shared/components/organisms/Dialog";

interface UserCardProps {
    user: User
    isOwner: boolean
    ownerIsSeeing: boolean
}

export default function UserCard({ user, isOwner, ownerIsSeeing }: UserCardProps) {
    const [isOpenConfirmation, setIsOpenConfirmative] = useState(false)
    const [isOpenInformative, setIsOpenInformative] = useState(false)

    function onSubmit () {
        setIsOpenConfirmative(false)
        setIsOpenInformative(true)
    }

    return (
        <Card className="flex flex-row justify-between items-center pr-4 h-18">
            <CardHeader className="flex w-full items-center gap-3">
                <ProfilePicture name={user.name} variant="secondary" />
                <p className={`text-xl font-semibold ${isOwner ? "text-primary" : "text-foreground"}`}>{user.name}</p>
            </CardHeader>


            {ownerIsSeeing && !isOwner && (
                <VehicleCardButton title="Desvincular" Icon={Unlink} destructive onClick={() => setIsOpenConfirmative(true)} />
            )}

            <AlertDialogComponent 
                open={isOpenConfirmation}
                onOpenChange={setIsOpenConfirmative}
                title="Desvincular Usuário"
                description="Você realmente deseja desvincular esse usuário de seu veículo?"
                confirmText="Desvincular"
                onClick={() => onSubmit()}
            />
            <DialogComponent
                open={isOpenInformative}
                onOpenChange={setIsOpenInformative}
                title="Usuário Desvinculado"
                description="Usuário desvinculado de seu veículo com sucesso"
            />
        </Card>
    )

}