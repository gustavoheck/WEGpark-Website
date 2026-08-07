"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import {
  acceptAssociationRequest,
  listAssociationRequests,
  rejectAssociationRequest,
} from "../services/requestService";

const REQUEST_QUERY_KEY = ["requests", "vehicle-association"] as const;

export function useAssociationRequests() {
  const queryClient = useQueryClient();
  const requestQuery = useQuery({
    queryKey: REQUEST_QUERY_KEY,
    queryFn: listAssociationRequests,
  });

  function refreshRelatedData() {
    void Promise.all([
      queryClient.invalidateQueries({ queryKey: REQUEST_QUERY_KEY }),
      queryClient.invalidateQueries({ queryKey: ["vehicle"] }),
      queryClient.invalidateQueries({ queryKey: ["notification"] }),
    ]);
  }

  const acceptMutation = useMutation({
    mutationFn: acceptAssociationRequest,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Solicitação aceita e usuário vinculado com sucesso!",
      });
      refreshRelatedData();
    },
    onError: (error: unknown) => {
      toast.add({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Não foi possível aceitar a solicitação.",
        ),
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectAssociationRequest,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "Solicitação recusada.",
      });
      refreshRelatedData();
    },
    onError: (error: unknown) => {
      toast.add({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Não foi possível recusar a solicitação.",
        ),
      });
    },
  });

  return {
    requests: requestQuery.data ?? [],
    isLoading: requestQuery.isLoading,
    isError: requestQuery.isError,
    acceptRequest: acceptMutation.mutate,
    acceptingRequestUuid: acceptMutation.isPending
      ? acceptMutation.variables
      : undefined,
    rejectRequest: rejectMutation.mutate,
    rejectingRequestUuid: rejectMutation.isPending
      ? rejectMutation.variables
      : undefined,
  };
}
