"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader
} from "@/components/ui/card";

import SectionTitle from "@/shared/components/atoms/SectionTitle";
import Link from "next/link";

export function VerifyEmailCard({ email }: { email: string }) {

    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="flex flex-col items-center text-center">
                <SectionTitle className="py-2 flex" text="confirme seu e-mail" />
            </CardHeader>
            <CardContent>
                <CardDescription>
                    Enviamos um código de verificação para {email}
                </CardDescription>
                <Link href="/login">
                    <Button>
                        Voltar à Pagina de Login
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}