"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldGroup } from "@/components/ui/field";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import FormField from "@/shared/components/atoms/FormField";
import FormButton from "@/shared/components/atoms/FormButton";

import { UserTypeSelector } from "../../../auth/components/molecules/UserTypeSelector";
import { EmployeeFields } from "../../../auth/components/molecules/CollaboratorFields";
import { VisitorFields } from "../../../auth/components/molecules/VisitorFields";
import { UserType } from "../../enums/UserType";
import { toast } from "@/components/ui/toast";
import { useRegister } from "../../hooks/auth.mutations";
import { RegisterFormValues, registerSchema } from "../../schemas/auth.schema";
import { RegisterRequest } from "../../types/auth.type";

interface RegisterFormProps {
    onRegistered: (email: string) => void;
}

export function RegisterForm({ onRegistered }: RegisterFormProps) {
    const { mutate: register, isPending, error } = useRegister();

    const methods = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const {
        register: registerField,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = methods;

    const userType = watch("type") as UserType | undefined;

    function handleSelectType(type: UserType) {
        setValue("type", type as any, { shouldValidate: true });
    }

    function onSubmit(values: RegisterFormValues) {
        if (!values.type) return;

        let request: RegisterRequest;

        const defaults = { email: values.email, password: values.password };
        const parkUserDefaults = { name: values.name, telephone: values.telephone };

        if (values.type === "COLLABORATOR") {
            request = {
                defaults,
                parkUserDefaults,
                badgeNumber: values.badgeNumber,
                location: values.location,
            };
        } else {
            request = {
                defaults,
                parkUserDefaults,
                company: values.company,
                cpf: values.cpf,
            };
        }

        register(
            { request, userType: values.type as UserType },
            {
                onSuccess: () => {
                    onRegistered(values.email);
                    toast.add({ type: "success", description: "Cadastro realizado com sucesso!" });
                },
                onError: () => {
                    toast.add({ type: "error", description: "Erro ao realizar cadastro." });
                },
            }
        );
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <SectionTitle className="py-2 flex" text="cadastrar-se" />
                <CardDescription>
                    Insira seus dados para se cadastrar no WEGpark
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <FormField
                                text="nome completo"
                                id="name"
                                registration={registerField("name")}
                                error={errors.name}
                            />

                            <FormField
                                text="telefone"
                                id="telephone"
                                registration={registerField("telephone")}
                                error={errors.telephone}
                            />

                            <FormField
                                text="email"
                                id="email"
                                registration={registerField("email")}
                                error={errors.email}
                            />

                            <FormField
                                text="senha"
                                id="password"
                                type="password"
                                registration={registerField("password")}
                                error={errors.password}
                            />

                            <FormField
                                text="confirmar senha"
                                id="confirm-password"
                                type="password"
                                registration={registerField("confirmPassword")}
                                error={errors.confirmPassword}
                            />

                            <UserTypeSelector value={userType || null} onChange={handleSelectType} />

                            {userType === "COLLABORATOR" && <EmployeeFields />}

                            {userType === "VISITOR" && <VisitorFields />}

                            {error && (
                                <p className="text-sm text-destructive">
                                    Não foi possível concluir o cadastro. Tente novamente.
                                </p>
                            )}
                            <FormButton
                                disabled={!userType || isPending}
                                text={isPending ? "Enviando..." : "Cadastrar"}
                            />
                        </FieldGroup>
                    </form>
                </FormProvider>
            </CardContent>
        </Card>
    );
}