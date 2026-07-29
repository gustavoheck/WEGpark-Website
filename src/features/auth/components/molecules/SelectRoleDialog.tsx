import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRoleType }  from "@/shared/enum/UserRole"

const roleLabels: Record<UserRoleType, string> = {
  PARKUSER: "Usuario",
  ADMIN: "Administrador",
  RH: "RH",
  GUARD: "Guarita",
  COLLABORATOR: "Colaborador",
  VISITOR: "Visitante"
};
interface SelectRoleDialogProps {
  open: boolean;
  roles: UserRoleType[];
  onSelect: (role: UserRoleType) => void;
}

export function SelectRoleDialog({ open, roles, onSelect }: SelectRoleDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como você deseja entrar?</DialogTitle>
          <DialogDescription>
            Encontramos mais de uma conta associada a esse e-mail. Selecione qual deseja acessar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {roles.map((role) => (
            <Button key={role} variant="outline" onClick={() => onSelect(role)} className="py-5 text-lg font-semibold">
              {roleLabels[role]}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}