"use client";

import { useState } from "react";
import { RegisterForm } from "./RegisterForm";
import { VerifyEmailCard } from "./VerifyEmailCard";

type Step = "REGISTER" | "VERIFY" | "DONE";

export function RegisterFlow() {
    const [step, setStep] = useState<Step>("REGISTER");
    const [email, setEmail] = useState("");

    function handleRegistered(registeredEmail: string) {
        setEmail(registeredEmail);
        setStep("VERIFY");
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-8 py-12">
            {step === "REGISTER" ? (
                <RegisterForm onRegistered={handleRegistered} />
            ) : null}
            
            {step === "VERIFY" ? (
                <VerifyEmailCard email={email} />
            ) : null}
        </div>
    );
}