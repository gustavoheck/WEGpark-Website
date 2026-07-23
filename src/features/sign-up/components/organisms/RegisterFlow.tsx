"use client";

import { useEffect, useState } from "react";
import { RegisterForm } from "./RegisterForm";
import { useRouter } from "next/navigation";
import { VerifyEmailForm } from "./VerifyEmailForm";

type Step = "REGISTER" | "VERIFY" | "DONE";

const REDIRECT_DELAY_MS = 2000;

export function RegisterFlow() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("REGISTER");
    const [email, setEmail] = useState("");

    function handleRegistered(registeredEmail: string) {
        setEmail(registeredEmail);
        setStep("VERIFY");
    }

    function handleVerified() {
        setStep("DONE");
    }

    useEffect(() => {
        if(step !== "DONE") {
            return;
        }

        const timeoutId = setTimeout(() => {
            router.push("/login");
        }, REDIRECT_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [step, router]);

    return (
        <div className="mx-auto w-full max-w-md space-y-8 py-12">
            {step === "REGISTER" ? (
                <RegisterForm onRegistered={handleRegistered} />
            ) : null}
            
            {step === "VERIFY" ? (
                <VerifyEmailForm email={email} onVerified={handleVerified} />
            ) : null}

            {step === "DONE" ? (
                <p className="text-center text-sm text-muted-foreground">
                    Conta ativada com sucesso. Você já pode fazer login.
                </p>
            ) : null}
        </div>
    );
}