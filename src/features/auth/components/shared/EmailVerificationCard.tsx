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

import { useResendEmail } from "../../hooks/useAuthMutations";
import axios from "axios";
import { useEffect, useState } from "react";

interface EmailVerificationCardProps {
  email: string;
  onBackToLogin: () => void;
}

export function EmailVerificationCard({
  email,
  onBackToLogin,
}: EmailVerificationCardProps) {
  const { mutate: resendEmail } = useResendEmail();

  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  function handleResend() {
    resendEmail(
      { email },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "E-mail de verificação reenviado!",
          });
          setCooldown(60);
        },
        onError: (error: unknown) => {
          if (!axios.isAxiosError(error)) {
            toast.add({
              type: "error",
              description: "Ocorreu um erro inesperado. Tente novamente."
            });
            return;
          }

          const status = error.response?.status;

          switch (status) {
            case 400: {
              toast.add({
                type: "error",
                description: "Informe um e-mail válido."
              });
              break;
            }
            case 404: {
              toast.add({
                type: "error",
                description: "Nenhuma conta foi encontrada com este e-mail."
              });
              break;
            }
            case 409: {
              toast.add({
                type: "error",
                description: "Este e-mail já foi verificado. Redirecionando para o login.",
              });

              onBackToLogin();
              break;
            }
            case 500:
              toast.add({
                type: "error",
                description: "Não foi possível enviar o e-mail. Tente novamente.",
              });
              break;
            default:
              toast.add({
                type: "error",
                description: "Ocorreu um erro inesperado.",
              });
          }
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
            disabled={cooldown > 0}
          >
            {cooldown > 0 ? `Reenviar e-mail novamente em ${cooldown}s` : "Reenviar e-mail"}
          </Button>

          <Button type="button" variant="link" onClick={onBackToLogin}>
            Voltar à página de login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
