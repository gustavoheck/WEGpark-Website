import SectionTitle from "@/shared/components/atoms/SectionTitle"
import RequestCard from "./RequestCard"
import { Request } from "../types/Request"

interface RequestListProps {
    requests : Request[]
}

export default function RequestList({requests} : RequestListProps) {

    requests = []
    return (
        <section>
            <SectionTitle text="solicitações" />
            <div className="flex flex-col gap-6 mb-6">
                {requests.length === 0 && (
                    <p className="text-center font-semibold text-foreground">Nenhuma Solicitação no Momento...</p>
                )}
                {requests.map((r) => {
                    return (
                        <RequestCard key={r.uuid} request={r}/>
                    )
                })}
            </div>
        </section>
    )
}