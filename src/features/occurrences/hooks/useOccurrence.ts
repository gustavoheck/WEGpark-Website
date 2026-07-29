"use client"

import { useQuery } from "@tanstack/react-query"
import { getService, getServiceProps } from "../services/getService"

export function useOccurrence (params : getServiceProps = {}) {
    return useQuery({
        queryKey: ["vehicle", params],
        queryFn: () => getService(params)
    })
}