type VendorsPage = {
    page: number;
    totalPages: number;
    data: unknown[];
};

export function getNextVendorsPage(lastPage: VendorsPage): number | undefined {
    return lastPage.page >= lastPage.totalPages ? undefined : lastPage.page + 1;
}
