import { Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { VehicleUser } from "@/shared/types/Vehicle";

import UserCard from "../molecules/UserCard";

interface UserListProps {
  users: VehicleUser[];
}

export default function UserList({ users }: UserListProps) {
  const activeUsers = users.filter((user) => user.associationActive);

  if (activeUsers.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
            <Users className="size-7" />
          </div>
          <div>
            <p className="font-semibold text-foreground">
              Nenhum usuário vinculado
            </p>
            <p className="text-sm text-muted-foreground">
              Os usuários ativos deste veículo aparecerão aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {activeUsers.map((user) => (
        <UserCard key={user.userUuid} user={user} />
      ))}
    </div>
  );
}
