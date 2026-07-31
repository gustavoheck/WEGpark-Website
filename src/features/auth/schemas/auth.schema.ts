import { UserRole } from "@/shared/enum/UserRole";
import z from "zod";

// Aux Constants

const CORPORATE_EMAIL_DOMAIN = "@weg.net";
const CPF_REGEX = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;

// Aux Fields

const emailField = z.string().email("Insira um e-mail válido");
const passwordField = z
  .string()
  .min(8, "A senha deve conter no mínimo 8 caracteres")
  .refine((password) => /[A-Z]/.test(password), {
    message: "A senha deve conter pelo menos uma letra maiúscula",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "A senha deve conter pelo menos uma letra minuscúla",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "A senha deve conter pelo menos um número",
  })
  .refine((password) => /[^A-Za-z0-9]/.test(password), {
    message: "A senha deve conter pelo menos um caractere especial",
  });
const codeField = z.string().length(6, "O código deve possuir 6 dígitos");

// Login
export const checkEmailSchema = z.object({
  email: emailField,
});

export type CheckEmailFormValues = z.infer<typeof checkEmailSchema>;

export const loginPasswordSchema = z.object({
  password: z.string().min(1, "Informe sua senha"),
});
export type LoginPasswordFormValues = z.infer<typeof loginPasswordSchema>;

// Register
const baseUserSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo"),
  telephone: z.string().min(8, "Informe um telefone válido"),
  email: emailField,
  password: passwordField,
  confirmPassword: z.string().min(8, "Confirme a senha"),
});

export const collaboratorSchema = baseUserSchema.merge(
  z.object({
    type: z.literal("COLLABORATOR"),
    badgeNumber: z.string().min(1, "Informe o número do crachá"),
    location: z.string().min(1, "Informe o setor"),
  })
);
export type CollaboratorFormValues = z.infer<typeof collaboratorSchema>;

export const visitorSchema = baseUserSchema.merge(
  z.object({
    type: z.literal("VISITOR"),
    company: z.string().min(1, "Informe o nome da empresa"),
    cpf: z.string().regex(CPF_REGEX, "CPF inválido"),
  })
);
export type VisitorFormValues = z.infer<typeof visitorSchema>;

export const registerSchema = z
  .discriminatedUnion("type", [collaboratorSchema, visitorSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.type === "COLLABORATOR"
        ? data.email.toLowerCase().endsWith(CORPORATE_EMAIL_DOMAIN)
        : true,
    {
      message: "E-mail corporativo deve pertencer ao domínio WEG",
      path: ["email"],
    }
  );
export type RegisterFormValues = z.infer<typeof registerSchema>;

// Password Reset

export const ResetPasswordCheckSchema = z.object({
  email: emailField,
  role: z.nativeEnum(UserRole)
});
export type resetPasswordCheckFormValues = z.infer<typeof ResetPasswordCheckSchema>;

export const ResetPasswordAnswerSchema = z.object({
  code: codeField,
});
export type ResetPasswordAnswerFormValues = z.infer<typeof ResetPasswordAnswerSchema>;

export const newPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(8, "Confirme a senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });
export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;
