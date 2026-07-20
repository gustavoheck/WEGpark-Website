"use client";

import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/loginService";

export function useLogin() {
    return useMutation({
        mutationFn: loginService,
        onSuccess: (data) => {
            console.log("Login efetuado com sucesso, token:", data.token);
        },
        onError: (error) => {
            console.error("Erro ao efetuar o login: ", error)
        },
    });
}