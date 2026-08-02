import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SystemRoleType }  from "@/shared/enum/SystemRoleType"

const roleLabels: Record<SystemRoleType, string> = {
  ROLE_PARK: "Usuário",
  ROLE_ADMIN: "Administrador",
  ROLE_RH: "RH",
  ROLE_GUARD: "Guarita"
};

interface  RoleSelectionDialogProps {
  open: boolean;
  roles: SystemRoleType[];
  onSelectRole: (role: SystemRoleType) => void;
  onOpenChange: (open: boolean) => void;
}

export function  RoleSelectionDialog({ open, roles, onSelectRole, onOpenChange }:  RoleSelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Como você deseja entrar?</DialogTitle>
          <DialogDescription>
            Encontramos mais de uma conta associada a esse e-mail. Selecione qual deseja acessar.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {roles.map((role) => (
            <Button key={role} variant="outline" onClick={() => onSelectRole(role)} className="py-5 text-lg font-semibold">
              {roleLabels[role]}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
