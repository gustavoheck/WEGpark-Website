import type { Request } from "../types/Request";
import RequestCard from "./RequestCard";

interface RequestListProps {
  requests: Request[];
  onAccept: (requestUuid: string) => void;
  onReject: (requestUuid: string) => void;
  acceptingRequestUuid?: string;
  rejectingRequestUuid?: string;
}

export default function RequestList({
  requests,
  onAccept,
  onReject,
  acceptingRequestUuid,
  rejectingRequestUuid,
}: RequestListProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {requests.map((request) => (
        <RequestCard
          key={request.uuid}
          request={request}
          onAccept={onAccept}
          onReject={onReject}
          isAccepting={acceptingRequestUuid === request.uuid}
          isRejecting={rejectingRequestUuid === request.uuid}
        />
      ))}
    </div>
  );
}
