import type { UserListItem } from "../../types/User";
import UserManagementCard from "../molecules/UserManagementCard";

interface UserManagementListProps {
  users: UserListItem[];
}

export function UserManagementList({ users }: UserManagementListProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 md:gap-0 md:overflow-hidden md:rounded-xl md:bg-card md:ring-1 md:ring-foreground/10">
      <div className="hidden grid-cols-[minmax(0,1.4fr)_minmax(9rem,0.7fr)_auto] items-center gap-3 border-b bg-muted/50 px-4 py-2 text-xs font-semibold text-muted-foreground md:grid">
        <span>Usuário</span>
        <span>Perfil e status</span>
        <span className="text-right">Ações</span>
      </div>

      {users.map((user) => (
        <UserManagementCard key={user.id} user={user} />
      ))}
    </div>
  );
}
