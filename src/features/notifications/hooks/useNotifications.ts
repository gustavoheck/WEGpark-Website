"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/toast";
import { getApiErrorMessage } from "@/shared/lib/getApiErrorMessage";

import {
  deleteNotification,
  listNotifications,
} from "../services/notificationService";

export const NOTIFICATION_QUERY_KEY = ["notification"] as const;

export function useNotifications() {
  const queryClient = useQueryClient();
  const notificationQuery = useQuery({
    queryKey: NOTIFICATION_QUERY_KEY,
    queryFn: listNotifications,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: async () => {
      toast.add({
        type: "success",
        description: "Notificação removida.",
      });
      await queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY,
      });
    },
    onError: (error: unknown) => {
      toast.add({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Não foi possível remover a notificação.",
        ),
      });
    },
  });

  return {
    notifications: notificationQuery.data ?? [],
    isLoading: notificationQuery.isLoading,
    isError: notificationQuery.isError,
    deleteNotification: deleteMutation.mutate,
    deletingNotificationUuid: deleteMutation.isPending
      ? deleteMutation.variables
      : undefined,
  };
}
