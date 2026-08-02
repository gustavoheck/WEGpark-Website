"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SystemRoleType } from "@/shared/enum/SystemRoleType";
import { PasswordResetRequestForm } from "./PasswordResetRequestForm";
import { PasswordResetConfirmationForm } from "./PasswordResetConfirmationForm";
import { PasswordResetCodeForm } from "./PasswordResetCodeForm";

type PasswordResetStep = "REQUEST" | "VERIFY" | "RESET" | "DONE";

type PasswordResetContext = {
    email: string;
    role: SystemRoleType | null;
    numberTokenId: string;
    resetToken: string;
};

const REDIRECT_DELAY_MS = 2000;

export function PasswordResetFlow() {
    const router = useRouter();
    const [step, setStep] = useState<PasswordResetStep>("REQUEST");
    const [resetContext, setResetContext] = useState<PasswordResetContext>({
        email: "",
        role: null,
        numberTokenId: "",
        resetToken: "",
    });

    function handleCodeRequested(requestedEmail: string, requestedRole: SystemRoleType, tokenId: string) {
        setResetContext({
            email: requestedEmail,
            role: requestedRole,
            numberTokenId: tokenId,
            resetToken: "",
        });
        setStep("VERIFY");
    }

    function handleVerified(token: string) {
        setResetContext((current) => ({ ...current, resetToken: token }));
        setStep("RESET");
    }

    function handleReset() {
        setStep("DONE");
    }

    useEffect(() => {
        if (step !== "DONE") {
            return;
        }

        const timeoutId = setTimeout(() => {
            router.push("/login");
        }, REDIRECT_DELAY_MS);

        return () => clearTimeout(timeoutId);
    }, [step, router]);

    return (
        <div className="mx-auto w-full max-w-md space-y-8 py-12">
            {step === "REQUEST" ? (
                <PasswordResetRequestForm onCodeRequested={handleCodeRequested} />
            ) : null}

            {step === "VERIFY" ? (
                <PasswordResetCodeForm
                    email={resetContext.email}
                    numberTokenId={resetContext.numberTokenId}
                    onVerified={handleVerified}
                />
            ) : null}

            {step === "RESET" && resetContext.role ? (
                <PasswordResetConfirmationForm
                    resetToken={resetContext.resetToken}
                    email={resetContext.email}
                    role={resetContext.role}
                    onReset={handleReset}
                />
            ) : null}

            {step === "DONE" ? (
                <p className="text-center text-sm text-muted-foreground">
                    Senha redefinida com sucesso. Redirecionando para o login...
                </p>
            ) : null}
        </div>
    );
}
