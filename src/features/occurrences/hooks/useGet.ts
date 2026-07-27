"use client"

import { useMutation } from "@tanstack/react-query"
import { getService } from "../services/getService"

export function useGet () {
    return useMutation({
        mutationFn : getService
    })
}