import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useStats() {
    return useQuery({
        queryKey: ["stats"],
        queryFn: () => apiFetch("/stats"),
    });
}
