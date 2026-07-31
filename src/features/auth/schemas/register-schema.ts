import z from "zod";
import { visitorSchema } from "./visitorSchema";
import { collaboratorSchema } from "./collaboratorSchema";

const CORPORATE_EMAIL_DOMAIN = "@weg.net";

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

export const verifyEmailSchema = z.object({
  code: z.string().length(6, "O código deve possuir 6 dígitos"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;