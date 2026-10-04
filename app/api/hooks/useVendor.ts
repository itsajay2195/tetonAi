import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";
import { VendorDetail } from "../../types/vendor";

export function useVendor(vendorId: string) {
    return useQuery<VendorDetail>({
        queryKey: ["vendor", vendorId],
        queryFn: () => apiFetch(`/vendors/${vendorId}`),
        enabled: !!vendorId,
    });
}