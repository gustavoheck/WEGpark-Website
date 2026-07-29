'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldGroup } from '@/components/ui/field';
import FormField from '@/shared/components/atoms/FormField';
import FormButton from '@/shared/components/atoms/FormButton';

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent
} from '@/components/ui/card';

import SectionTitle from '@/shared/components/atoms/SectionTitle';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginPasswordSchema, LoginPasswordFormValues } from '@/features/auth/schemas/LoginSchema';
import { LoginResponse } from '@/features/auth/types/loginResponse';
import { UserRoleType } from '@/shared/enum/UserRole';

interface PasswordFormProps {
  email: string;
  role: UserRoleType;
  onLoginSuccess: (response: LoginResponse) => void;
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle text="Entrar" className="py-2 flex" />
        <CardDescription>
          Digite sua senha para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>

            <FormField
              text="email"
              id="email"
              type="email"
              disabled={true}
              defaultValue={email}
            />

            <FormField
              text="senha"
              id="password"
              type="password"
              registration={register("password")}
              error={errors.password}
            />

            {error ? (
              <p className="text-sm text-destructive">E-mail ou senha inválidos.</p>
            ) : null}

            <FormButton disabled={isPending} text={isPending ? "Entrando..." : "Entrar"} />

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}