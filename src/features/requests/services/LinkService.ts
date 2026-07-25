import { api } from "@/shared/lib/api";
import { Request } from "../types/Request";

interface LinkServiceParams {
    request : Request
}

export async function linkService({request} : LinkServiceParams
) {
    await api.put(`/request/${request.uuid}`, request);
}