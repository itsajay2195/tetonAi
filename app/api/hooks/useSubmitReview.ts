import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

type SubmitReviewInput = {
    vendorId: string;
    rating: number;
    comment: string;
};

export function useSubmitReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ vendorId, rating, comment }: SubmitReviewInput) =>
            apiFetch(`/vendors/${vendorId}/reviews`, {
                method: "POST",
                body: JSON.stringify({ rating, comment }),
            }),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["vendor", variables.vendorId] });
        },
    });
}
