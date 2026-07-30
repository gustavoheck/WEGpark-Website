"use client";

import { useMutation } from "@tanstack/react-query";
import { checkRolesService } from "../services/checkRolesService";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export function useCheckEmail() {
  return useMutation<CheckEmailResponse, Error, string>({
    mutationFn: (email: string) => checkRolesService(email),
  });
}