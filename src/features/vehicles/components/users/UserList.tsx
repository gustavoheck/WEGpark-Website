import type { VehicleUser } from "@/shared/types/Vehicle";

import UserCard from "./UserCard";

interface UserListProps {
  users: VehicleUser[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {users.map((user) => (
        <UserCard key={user.userUuid} user={user} />
      ))}
    </div>
  );
}
