import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";
import { getNextVendorsPage } from "./getNextVendorsPage";

export function useVendors() {
    // useInfiniteQuery's raw data shape is { pages: [...], pageParams: [...] };
    // "select" flattens it into a single array of vendors across all loaded pages.
    return useInfiniteQuery({
        queryKey: ["vendors"],
        queryFn: ({ pageParam }) => apiFetch(`/vendors?page=${pageParam}&limit=20`),
        initialPageParam: 1,
        getNextPageParam: getNextVendorsPage,
        select: (data) => data.pages.flatMap((page) => page.data),
    });
}
