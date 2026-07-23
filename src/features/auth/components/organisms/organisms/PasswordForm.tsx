'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@base-ui/react';
import FormField from '@/shared/components/atoms/FormField';
import FormButton from '@/shared/components/atoms/FormButton';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginPasswordSchema, LoginPasswordFormValues } from '@/features/auth/schemas/LoginSchema';
import { UserRole, LoginResponseDTO } from '@/features/auth/types/Login';

interface PasswordFormProps {
  email: string; 
  role: UserRole;
  onLoginSuccess: (response: LoginResponseDTO) => void;
}

export function PasswordForm({ email, role, onLoginSuccess }: PasswordFormProps) {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPasswordFormValues>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: { password: '' },
  });

  function onSubmit(values: LoginPasswordFormValues) {
    login(
      { email, password: values.password, role },
      { onSuccess: onLoginSuccess },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>

        <Field>
          <FieldLabel htmlFor="email-locked" className="text-lg font-semibold capitalize text-foreground">E-mail</FieldLabel>
          <Input id="email-locked" type="email" value={email} disabled className="py-5 text-lg"/>
        </Field>

        <FormField
            text="senha"
            id="password"
            registration={register("password")}
            error={errors.password}
        />

        {error ? (
            <p className="text-sm text-destructive">E-mail ou senha inválidos.</p>
        ) : null}

        <FormButton disabled={isPending} text={isPending ? "Entrando..." : "Entrar"}/>

      </FieldGroup>
    </form>
  );
}