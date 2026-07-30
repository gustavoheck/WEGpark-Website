import User from "@/shared/types/User"
import UserCard from "../molecules/UserCard"


interface UserListProps {
    users : User[]
    ownerId : string
    userId : string
}

export default function UserList ({users, ownerId, userId} : UserListProps) {
    return (
        <div className="flex flex-col gap-4">
            {users.map((user) => {
                return (
                    <UserCard key={user.uuid} user={user} isOwner={ownerId === user.uuid} ownerIsSeeing={userId === ownerId} />
                )
            })}
        </div>
    )
}