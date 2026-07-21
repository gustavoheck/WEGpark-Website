'use client'

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton () {
    const router = useRouter();

    return (
        <Button
            className="rounded-full h-10 w-10 absolute left-0"
            onClick={() => router.back()}
        >
            <ArrowLeftIcon className="size-6"/>
        </Button>
    )
}