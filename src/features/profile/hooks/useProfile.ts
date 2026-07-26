"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profileService";


export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        staleTime: 1000 * 60 * 5, 
    });
}