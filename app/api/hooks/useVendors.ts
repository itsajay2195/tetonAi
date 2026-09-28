import { useInfiniteQuery } from "@tanstack/react-query";
import { apiFetch } from "../config/client";

export function useVendors() {

    //data struecture of the response from the useInfiniteQuery's data
    // }
    // { pages: [...], pageParams: [...] }
    // im customzigin the structure using the "selelct" option to return a flat array of vendors instead of the default structure
    return useInfiniteQuery({
        queryKey: ["vendors"],
        queryFn: ({ pageParam }) => apiFetch(`/vendors?page=${pageParam}&limit=20`),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage;
            return page >= totalPages ? undefined : page + 1;
        },
        select: (data) => data.pages.flatMap((page) => page.data),
    });
}



