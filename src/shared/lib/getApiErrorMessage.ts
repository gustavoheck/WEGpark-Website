import axios from "axios";

const API_MESSAGE_KEYS = ["message", "detail", "description", "error"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getMessageFromPayload(payload: unknown): string | null {
  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (!isRecord(payload)) {
    return null;
  }

  for (const key of API_MESSAGE_KEYS) {
    const value = payload[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  const errors = payload.errors;

  if (Array.isArray(errors)) {
    const messages = errors
      .map((error) => {
        if (typeof error === "string") {
          return error;
        }

        if (isRecord(error) && typeof error.defaultMessage === "string") {
          return error.defaultMessage;
        }

        return null;
      })
      .filter((message): message is string => Boolean(message));

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return null;
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (axios.isAxiosError(error)) {
    return getMessageFromPayload(error.response?.data) ?? fallbackMessage;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallbackMessage;
}
