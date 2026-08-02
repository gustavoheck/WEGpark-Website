'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldGroup } from '@/components/ui/field';
import FormField from "@/shared/components/atoms/FormField";
import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormButton from "@/shared/components/atoms/FormButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";

import { SystemRoleType } from '@/shared/enum/SystemRoleType';
import { CheckEmailFormValues, checkEmailSchema } from '../../schemas/auth.schema';
import { useAuthAccountRoles } from '../../hooks/auth.mutations';

interface CheckEmailFormProps {
  onEmailChecked: (email: string, roles: SystemRoleType[]) => void;
}

export function CheckEmailForm ({ onEmailChecked }: CheckEmailFormProps) {
  const { mutate: accountRoles, isPending, error } = useAuthAccountRoles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckEmailFormValues>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(values: CheckEmailFormValues) {
    accountRoles(
       { email: values.email },
      {
        onSuccess: (response) => {
          const roles = response.map((item) => item.role);
          onEmailChecked(values.email, roles);
        }
      },
    );
  }
  return (

    <Card className="w-full max-w-sm">
      <CardHeader>
        <SectionTitle text="Entrar" className="py-2 flex" />
        <CardDescription>
          Digite seu email para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, (invalidErrors) => console.log("Erros de Validação:", invalidErrors))}>
          <FieldGroup>

            <FormField
              text="email"
              id="email"
              registration={register("email")}
              error={errors.email}
            />

            <Link
              href="/esqueceu-senha"
              className="w-fit text-sm text-primary hover:text-primary hover:underline"
            >
              Esqueceu a senha?
            </Link>
            <p className="text-sm text-muted-foreground">
              Ainda não possui uma conta?{" "}
              <Link
                href={"/cadastro"}
                className="text-sm text-primary hover:text-primary hover:underline"
              >
                Cadastre-se aqui
              </Link>
            </p>

            {error ? (
              <p className="text-sm text-destructive">
                Não foi possível continuar. Verifique o e-mail informado.
              </p>
            ) : null}

            <FormButton disabled={isPending} text={isPending ? "Verificando..." : "Continuar"} />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}