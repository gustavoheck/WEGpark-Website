"use client";

import { useState } from "react";
import { CheckEmailForm } from "./CheckEmailForm";
import { SelectRoleDialog } from "../molecules/SelectRoleDialog";
import { PasswordForm } from "./PasswordForm";
import { LoginResponse } from "@/features/auth/types/loginResponse";
import { UserRoleType } from "@/shared/enum/UserRole";

type Step = "EMAIL" | "SELECT_ROLE" | "PASSWORD";

interface LoginFlowProps {
  onLoginSuccess: (response: LoginResponse) => void;
}

export function LoginFlow({ onLoginSuccess }: LoginFlowProps) {
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState('');
  const [availableRoles, setAvailableRoles] = useState<UserRoleType[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null);

  function handleEmailChecked(checkedEmail: string, roles: UserRoleType[] = []) {
    setEmail(checkedEmail);
    setAvailableRoles(roles);

    if (roles.length === 1) {
      setSelectedRole(roles[0]);
      setStep('PASSWORD');
    } else {
      setStep('SELECT_ROLE');
    }
  }

  function handleRoleSelected(role: UserRoleType) {
    setSelectedRole(role);
    setStep('PASSWORD');
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
        <PasswordForm email={email} role={selectedRole} onLoginSuccess={onLoginSuccess} />
      ) : null}
    </div>
  );
}