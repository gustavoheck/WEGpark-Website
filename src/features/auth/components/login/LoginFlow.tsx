"use client";

import { useState } from "react";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { LoginResponse } from "../../types/auth.type";
import { toast } from "@/components/ui/toast";
import { EmailLookupForm } from "./EmailLookupForm";
import { RoleSelectionDialog } from "./RoleSelectionDialog";
import { LoginCredentialsForm } from "./LoginCredentialsForm";
import { EmailVerificationCard } from "../shared/EmailVerificationCard";

type LoginStep = "EMAIL" | "SELECT_ROLE" | "PASSWORD" | "VERIFY_EMAIL";

interface LoginFlowProps {
  onLoginSuccess: (response: LoginResponse) => void;
}

export function LoginFlow({ onLoginSuccess }: LoginFlowProps) {
  const [step, setStep] = useState<LoginStep>("EMAIL");
  const [email, setEmail] = useState('');
  const [availableRoles, setAvailableRoles] = useState<SystemRoleType[]>([]);
  const [selectedRole, setSelectedRole] = useState<SystemRoleType | null>(null);

  function handleEmailChecked(checkedEmail: string, roles: SystemRoleType[] = []) {
    setEmail(checkedEmail);
    setAvailableRoles(roles);

    if (!roles || roles.length === 0) {
      toast.add({ type: "error", description: "Email não possui nenhuma role em nosso sistema" })
    } else if (roles.length === 1) {
      setSelectedRole(roles[0]);
      setStep('PASSWORD');
    } else {
      setStep('SELECT_ROLE');
    }
  }

  function handleRoleSelected(role: SystemRoleType) {
    setSelectedRole(role);
    setStep('PASSWORD');
  }

  function handleEmailNotVerified() {
    setStep('VERIFY_EMAIL')
  }

  function handleRoleDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedRole(null);
      setStep("EMAIL");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 py-12">
      {step === 'EMAIL' ? (
        <EmailLookupForm onEmailChecked={handleEmailChecked} />
      ) : null}

      <RoleSelectionDialog
        open={step === 'SELECT_ROLE'}
        roles={availableRoles}
        onSelectRole={handleRoleSelected}
        onOpenChange={handleRoleDialogOpenChange}
      />
      {step === 'PASSWORD' && selectedRole ? (
        <LoginCredentialsForm email={email} role={selectedRole} onLoginSuccess={onLoginSuccess} onNotVerified={handleEmailNotVerified} />
      ) : null}

      {step === 'VERIFY_EMAIL' && (
        <EmailVerificationCard email={email} />
      )}
    </div>
  );
}
