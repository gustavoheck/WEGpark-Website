"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useResendVerificationCode, useVerifyEmail } from "../hooks/useVerifyEmail";
import { verifyEmailSchema, VerifyEmailFormValues } from "../schemas/register-schema";

interface VerifyEmailFormProps {
    email: string;
    onVerified: () => void;
}

export function VerifyEmailForm({ email, onVerified }: VerifyEmailFormProps) {
    const { mutate: verifyEmail, isPending, error } = useVerifyEmail();
    const { mutate: resendCode, isPending: isResending } = useResendVerificationCode;
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerifyEmailFormValues>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            code: "",
        },
    });

    function onSubmit
}