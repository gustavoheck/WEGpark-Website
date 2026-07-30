'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { FieldGroup } from '@/components/ui/field';
import FormField from '@/shared/components/atoms/FormField';
import FormButton from '@/shared/components/atoms/FormButton';
import SectionTitle from '@/shared/components/atoms/SectionTitle';

import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';

import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginPasswordSchema, LoginPasswordFormValues } from '@/features/auth/schemas/LoginSchema';
import { LoginResponse } from '@/features/auth/types/loginResponse';
import { UserRoleType } from '@/shared/enum/UserRole';
import { useAuth } from '@/shared/context/AuthContext';

interface PasswordFormProps {
  email: string;
  role: UserRoleType;
  onLoginSuccess?: (response: LoginResponse) => void;
}

export function PasswordForm({ email, role, onLoginSuccess }: PasswordFormProps) {
  const { mutate: login, isPending, error } = useLogin();
  const { login: setAuth } = useAuth();
  const router = useRouter();

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
      {
        onSuccess: (response: any) => {
          console.log("Resposta recebida do backend:", response);

          const jwtToken = response.token;

          if (!jwtToken) {
            console.error("Token não encontrado na resposta do backend. Objeto recebido:", response); //Ambiente de testes
            return;
          }

          setAuth(jwtToken, role);

          if (onLoginSuccess) {
            onLoginSuccess(response);
          }

          router.push("/veiculos");
        },
        onError: (err) => {
          console.error("Erro na requisição de login:", err);
        }
      },
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