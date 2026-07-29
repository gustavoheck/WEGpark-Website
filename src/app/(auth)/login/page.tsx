"use client"; 

import { useRouter } from "next/navigation";
import { LoginFlow } from "@/features/auth/components/organisms/LoginFlow";
import { LoginResponse } from "@/features/auth/types/loginResponse";

export default function LoginPage() {
    const router = useRouter(); 
    function handleLoginSuccess(response: LoginResponse) {
      router.push("/veiculos");
    }

    return <LoginFlow onLoginSuccess={handleLoginSuccess}/>
    
}