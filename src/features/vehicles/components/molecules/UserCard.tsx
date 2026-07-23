import { Card, CardHeader } from "@/components/ui/card";
import ProfilePicture from "@/shared/components/atoms/ProfilePicture";
import User from "@/shared/types/User";
import { Unlink } from "lucide-react";
import VehicleCardButton from "../atoms/VehicleCardButton";

interface UserCardProps {
    user: User
    isOwner : boolean
    ownerIsSeeing : boolean
}

export default function UserCard({ user, isOwner, ownerIsSeeing }: UserCardProps) {
    return (
        <Card className="flex flex-row justify-between items-center pr-4">
            <CardHeader className="flex w-full items-center gap-3">
                <ProfilePicture name={user.name} variant="secondary" />
                <p className={`text-xl font-semibold ${isOwner ? "text-primary" : "text-foreground"}`}>{user.name}</p>
            </CardHeader>
            

            {ownerIsSeeing && !isOwner && (
                <VehicleCardButton title="Desvincular" Icon={Unlink} destructive />
            )}
            
        </Card>
    )

}