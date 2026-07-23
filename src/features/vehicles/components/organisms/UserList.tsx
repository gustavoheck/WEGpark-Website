import User from "@/shared/types/User"
import UserCard from "../molecules/UserCard"


interface UserListProps {
    users : User[]
    ownerId : number
    userId : number
}

export default function UserList ({users, ownerId, userId} : UserListProps) {
    return (
        <div className="flex flex-col gap-4">
            {users.map((user) => {
                return (
                    <UserCard key={user.id} user={user} isOwner={ownerId === user.id} ownerIsSeeing={userId === ownerId} />
                )
            })}
        </div>
    )
}