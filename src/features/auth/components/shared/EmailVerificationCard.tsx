"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { useResendEmail } from "../../hooks/useAuthMutations";

export function EmailVerificationCard({ email }: { email: string }) {
  const { mutate: resendEmail, isPending } = useResendEmail();

  function handleResend() {
    if (!email) return;

    resendEmail(email, {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "E-mail de verificação reenviado!",
        });
      },
      onError: () => {
        toast.add({
          type: "error",
          description: "Erro ao reenviar e-mail. Tente novamente.",
        });
      },
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col items-center text-center">
        <SectionTitle className="py-2 flex" text="confirme seu e-mail" />
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <CardDescription>
          Enviamos um link de verificação para <strong className="text-foreground">{email}</strong>. Por favor, confira sua caixa de entrada e spam.
        </CardDescription>

        <div className="flex flex-col gap-2 pt-2">
          <Button variant="outline" onClick={handleResend} disabled={isPending}>
            {isPending ? "Reenviando..." : "Não recebeu? Reenviar e-mail"}
          </Button>

          <Link href="/login" className={buttonVariants({ variant: "default" })}>
            Voltar à Página de Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
