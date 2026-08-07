"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { useAuth } from "@/shared/context/AuthContext";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import {
  acceptAssociationRequest,
  listAssociationRequests,
  rejectAssociationRequest,
} from "../services/requestService";

const REQUEST_QUERY_KEY = ["requests", "vehicle-association"] as const;

export function useAssociationRequests() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const requestQueryKey = [...REQUEST_QUERY_KEY, user?.uuid] as const;
  const requestQuery = useQuery({
    queryKey: requestQueryKey,
    queryFn: listAssociationRequests,
    enabled: Boolean(user?.uuid),
    refetchOnMount: "always",
  });

  function refreshRelatedData() {
    void Promise.all([
      queryClient.invalidateQueries({ queryKey: requestQueryKey }),
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
