"use client";

import { useState } from "react";

import { toast } from "@/components/ui/toast";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";

import { EmailVerificationCard } from "../shared/EmailVerificationCard";
import { EmailLookupForm } from "./EmailLookupForm";
import { LoginCredentialsForm } from "./LoginCredentialsForm";
import { RoleSelectionDialog } from "./RoleSelectionDialog";

type LoginStep = "EMAIL" | "SELECT_ROLE" | "PASSWORD" | "VERIFY_EMAIL";

interface LoginFlowProps {
  onLoginSuccess: (role: SystemRoleType) => void;
}

export function LoginFlow({ onLoginSuccess }: LoginFlowProps) {
  const [step, setStep] = useState<LoginStep>("EMAIL");
  const [email, setEmail] = useState("");
  const [availableRoles, setAvailableRoles] = useState<SystemRoleType[]>([]);
  const [selectedRole, setSelectedRole] = useState<SystemRoleType | null>(null);

  function handleEmailChecked(
    checkedEmail: string,
    roles: SystemRoleType[] = [],
  ) {
    setEmail(checkedEmail);
    setAvailableRoles(roles);

    if (roles.length === 0) {
      toast.add({
        type: "error",
        description: "O e-mail não possui nenhum perfil no sistema.",
      });
    } else if (roles.length === 1) {
      setSelectedRole(roles[0]);
      setStep("PASSWORD");
    } else {
      setStep("SELECT_ROLE");
    }
  }

  function handleRoleSelected(role: SystemRoleType) {
    setSelectedRole(role);
    setStep("PASSWORD");
  }

  function handleEmailNotVerified() {
    setStep("VERIFY_EMAIL");
  }

  function handleBackToLogin() {
    setEmail("");
    setAvailableRoles([]);
    setSelectedRole(null);
    setStep("EMAIL");
  }

  function handleRoleDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedRole(null);
      setStep("EMAIL");
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 py-12">
      {step === "EMAIL" ? (
        <EmailLookupForm onEmailChecked={handleEmailChecked} />
      ) : null}

      <RoleSelectionDialog
        open={step === "SELECT_ROLE"}
        roles={availableRoles}
        onSelectRole={handleRoleSelected}
        onOpenChange={handleRoleDialogOpenChange}
      />

      {step === "PASSWORD" && selectedRole ? (
        <LoginCredentialsForm
          email={email}
          role={selectedRole}
          onLoginSuccess={onLoginSuccess}
          onNotVerified={handleEmailNotVerified}
        />
      ) : null}

      {step === "VERIFY_EMAIL" ? (
        <EmailVerificationCard
          email={email}
          onBackToLogin={handleBackToLogin}
        />
      ) : null}
    </div>
  );
}
