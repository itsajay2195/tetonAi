import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";
import { Vendor } from "../../types/vendor";

type FavoritesResponse = {
    total: number;
    data: Vendor[];
};

export function useFavorites() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: (): Promise<FavoritesResponse> => apiFetch("/favorites"),
        select: (data) => data.data,
    });
}
