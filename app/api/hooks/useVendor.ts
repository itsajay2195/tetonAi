import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useVendor(vendorId: string) {
    return useQuery({
        queryKey: ["vendor", vendorId],
        queryFn: () => apiFetch(`/vendors/${vendorId}`),
        enabled: !!vendorId,
    });
}