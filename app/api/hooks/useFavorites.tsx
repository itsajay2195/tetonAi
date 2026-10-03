import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useFavorites() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: () => apiFetch("/favorites"),
        select: (data) => data?.data?.map((vendor: any) => ({
            id: vendor.id,
            name: vendor.name,
            thumbnail: vendor.thumbnail,
            rating: vendor.rating,
            cuisine: vendor.cuisine,
            city: vendor.city,
            priceLevel: vendor.priceLevel,
            isFavorite: true, // Since these are favorites, we can set isFavorite to true
        })),
    });
}
