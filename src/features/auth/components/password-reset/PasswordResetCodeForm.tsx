"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/toast";
import FormButton from "@/shared/components/atoms/FormButton";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import { useResetPasswordAnswer } from "../../hooks/useAuthMutations";
import {
  ResetPasswordAnswerFormValues,
  ResetPasswordAnswerSchema,
} from "../../schemas/auth.schema";

interface PasswordResetCodeFormProps {
  email: string;
  numberTokenId: string;
  onVerified: (resetToken: string) => void;
}

export function PasswordResetCodeForm({
  email,
  numberTokenId,
  onVerified,
}: PasswordResetCodeFormProps) {
  const { mutate, isPending } = useResetPasswordAnswer();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordAnswerFormValues>({
    resolver: zodResolver(ResetPasswordAnswerSchema),
    defaultValues: { code: "" },
  });

  function onSubmit(values: ResetPasswordAnswerFormValues) {
    mutate(
      { numberTokenId, numberCode: values.code },
      {
        onSuccess: (data) => onVerified(data.token),
        onError: (error) => {
          toast.add({
            type: "error",
            description: getApiErrorMessage(
              error,
              "Código inválido ou expirado. Tente novamente.",
            ),
          });
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        <SectionTitle className="flex py-2" text="confirme o código" />
        <CardDescription>
          Enviamos um código de verificação para {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={Boolean(errors.code)}>
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <div className="flex justify-center py-2">
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }, (_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="h-12 w-12 border-primary/40 text-xl"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                )}
              />
              {errors.code ? (
                <FieldError>{errors.code.message}</FieldError>
              ) : null}
            </Field>

            <FormButton
              disabled={isPending}
              text={isPending ? "Verificando..." : "Confirmar"}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
