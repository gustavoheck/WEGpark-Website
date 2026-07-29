"use client";

import { useMutation } from "@tanstack/react-query";
import { checkRolesService } from "../services/checkRolesService";
import { CheckEmailRequest } from "../types/checkEmailRequest";
import { CheckEmailResponse } from "../types/checkEmailResponse";

export function useCheckEmail() {
  return useMutation<CheckEmailResponse, Error, CheckEmailRequest>({
    mutationFn: (params: CheckEmailRequest) => checkRolesService(params),
  });
}