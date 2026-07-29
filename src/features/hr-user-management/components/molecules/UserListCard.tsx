import { UserListItem } from "../../types/User";

interface UserListCardProps {
    user: UserListItem;
}

const roleLabels: Record<UserListItem["role"], string> = {
    COLABORADOR: "Colaborador",
    VISITANTE: "Visitante",
    RH: "RH",
    GUARITA: "Guarita",
};

export function UserListCard({ user }: UserListCardProps) {
    return (
        <div className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
            <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <span className="text-sm font-medium text-primary">{roleLabels[user.role]}</span>
        </div>
    );
}