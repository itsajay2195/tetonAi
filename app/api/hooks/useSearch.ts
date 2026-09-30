import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useSearch(query: string) {
    return useQuery({
        queryKey: ["search", query],
        queryFn: () => apiFetch(`/search?q=${encodeURIComponent(query)}`),
        enabled: query.length > 0,
        select: (data) => data.data,
    });
}
