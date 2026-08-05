"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { EmailVerificationCard } from "../shared/EmailVerificationCard";
import { RegistrationForm } from "./RegistrationForm";

type RegistrationStep = "REGISTER" | "VERIFY";

export function RegistrationFlow() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>("REGISTER");
  const [email, setEmail] = useState("");

  function handleRegistered(registeredEmail: string) {
    setEmail(registeredEmail);
    setStep("VERIFY");
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 py-12">
      {step === "REGISTER" ? (
        <RegistrationForm onRegistered={handleRegistered} />
      ) : null}

      {step === "VERIFY" ? (
        <EmailVerificationCard
          email={email}
          onBackToLogin={() => router.push("/login")}
        />
      ) : null}
    </div>
  );
}
