"use client"; 

import { useRouter } from "next/navigation";
import { LoginFlow } from "@/features/auth/components/organisms/organisms/LoginFlow";
import { LoginResponseDTO } from '@/features/auth/types/Login';

export default function LoginPage() {
    const router = useRouter(); 
    function handleLoginSuccess(response: LoginResponseDTO) {
      router.push("/veiculos");
    }

    return <LoginFlow onLoginSuccess={handleLoginSuccess}/>
    
}