"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useResendEmail } from "../../hooks/useAuthMutations";

interface EmailVerificationCardProps {
  email: string;
  onBackToLogin: () => void;
}

export function EmailVerificationCard({
  email,
  onBackToLogin,
}: EmailVerificationCardProps) {
  const { mutate: resendEmail, isPending } = useResendEmail();

  function handleResend() {
    if (!email) {
      return;
    }

    resendEmail(
      { email },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "E-mail de verificação reenviado!",
          });
        },
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Erro ao reenviar o e-mail. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col items-center text-center">
        <SectionTitle className="flex py-2" text="confirme seu e-mail" />
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <CardDescription>
          Enviamos um link de verificação para{" "}
          <strong className="text-foreground">{email}</strong>. Confira sua
          caixa de entrada e spam.
        </CardDescription>

        <div className="flex flex-col gap-2 pt-2">
          <Button
            type="button"
            variant="link"
            onClick={handleResend}
            disabled={isPending}
          >
            {isPending ? "Reenviando..." : "Não recebeu? Reenviar e-mail"}
          </Button>

          <Button type="button" variant="link" onClick={onBackToLogin}>
            Voltar à página de login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
