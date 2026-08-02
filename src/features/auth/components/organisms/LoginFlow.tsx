"use client";

import { useState } from "react";
import { SelectRoleDialog } from "../molecules/SelectRoleDialog";
import { PasswordForm } from "./PasswordForm";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { LoginResponse } from "../../types/auth.type";
import { toast } from "@/components/ui/toast";
import { CheckEmailForm } from "./CheckEmailForm";
import { VerifyEmailCard } from "./VerifyEmailCard";

type Step = "EMAIL" | "SELECT_ROLE" | "PASSWORD" | "VERIFY_EMAIL";

interface LoginFlowProps {
  onLoginSuccess: (response: LoginResponse) => void;
}

export function LoginFlow({ onLoginSuccess }: LoginFlowProps) {
  const [step, setStep] = useState<Step>("EMAIL");
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

  return (
    <div className="mx-auto w-full max-w-md space-y-8 py-12">
      {step === 'EMAIL' ? (
        <CheckEmailForm onEmailChecked={handleEmailChecked} />
      ) : null}

      <SelectRoleDialog
        open={step === 'SELECT_ROLE'}
        roles={availableRoles}
        onSelect={handleRoleSelected}
      />
      {step === 'PASSWORD' && selectedRole ? (
        <PasswordForm email={email} role={selectedRole} onLoginSuccess={onLoginSuccess} onNotVerified={handleEmailNotVerified} />
      ) : null}

      {step === 'VERIFY_EMAIL' && (
        <VerifyEmailCard email={email} />
      )}
    </div>
  );
}