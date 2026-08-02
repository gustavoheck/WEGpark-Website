"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { RequestResetForm } from "../organisms/RequestResetForm";
import { VerifyResetCodeForm } from "../organisms/VerifyResetCodeForm";
import { NewPasswordForm } from "../organisms/NewPasswordForm";
import { SystemRoleType } from "@/shared/enum/SystemRoleType";

type Step = "REQUEST" | "VERIFY" | "RESET" | "DONE";

const REDIRECT_DELAY_MS = 2000;

export function ResetPasswordFlow() {
    const router = useRouter();
    const [step, setStep] = useState<Step>("REQUEST");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<SystemRoleType | null>(null);
    const [numberTokenId, setNumberTokenId] = useState("");
    const [resetToken, setResetToken] = useState("");

    function handleCodeRequested(requestedEmail: string, requestedRole: SystemRoleType, tokenId: string) {
        setEmail(requestedEmail);
        setRole(requestedRole);
        setNumberTokenId(tokenId);
        setStep("VERIFY");
    }

    function handleVerified(token: string) {
        setResetToken(token);
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
                <RequestResetForm onCodeRequested={handleCodeRequested} />
            ) : null}

            {step === "VERIFY" ? (
                <VerifyResetCodeForm email={email} numberTokenId={numberTokenId} onVerified={handleVerified} />
            ) : null}

            {step === "RESET" && role ? (
                <NewPasswordForm resetToken={resetToken} email={email} role={role} onReset={handleReset} />
            ) : null}

            {step === "DONE" ? (
                <p className="text-center text-sm text-muted-foreground">
                    Senha redefinida com sucesso. Redirecionando para o login...
                </p>
            ) : null}
        </div>
    );
}
