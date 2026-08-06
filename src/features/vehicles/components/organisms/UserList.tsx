import { VehicleUser } from "@/shared/types/Vehicle"
import UserCard from "../molecules/UserCard"


interface UserListProps {
    users: VehicleUser[]
}

export default function UserList ({ users }: UserListProps) {
    if (users.length === 0) {
        return <p className="py-8 text-center text-muted-foreground">Nenhum usuário vinculado a este veículo.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {users.map((user) => {
                return (
                    <UserCard
                        key={user.userUuid}
                        user={user}
                        name={user.name}
                    />
                )
            })}
        </div>
    )
}
