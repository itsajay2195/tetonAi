import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useToggleFavorite(vendorId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (nextIsFavorite: boolean) =>
            nextIsFavorite
                ? apiFetch(`/vendors/${vendorId}/favorites`, { method: "POST" })
                : apiFetch(`/vendors/${vendorId}/favorites`, { method: "DELETE" }),

        onMutate: async (nextIsFavorite) => {
            await queryClient.cancelQueries({ queryKey: ["vendor", vendorId] });
            const previousVendor = queryClient.getQueryData(["vendor", vendorId]);

            queryClient.setQueryData(["vendor", vendorId], (old: any) =>
                old ? { ...old, isFavorite: nextIsFavorite } : old
            );

            return { previousVendor };
        },

        onError: (_err, _nextIsFavorite, context) => {
            // we are doing an optimzitc update, so if the api operatio fails, this weill roll back to the previous state
            if (context?.previousVendor) {
                queryClient.setQueryData(["vendor", vendorId], context.previousVendor);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["vendor", vendorId] });
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
