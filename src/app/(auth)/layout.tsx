import Image from "next/image";
import React from "react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4">
            <div className="mb-8 flex items-center justify-center">
                <Image 
                    src={"/assets/images/logo-dark.png"}
                    alt="Logo da WEGpark"
                    width={180}
                    height={50}
                    loading="eager"
                />
            </div>

            <main className="w-full max-w-sm">
                {children}
            </main>
        </div>
    );
}