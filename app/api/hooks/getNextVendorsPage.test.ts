import { getNextVendorsPage } from "./getNextVendorsPage";

describe("getNextVendorsPage", () => {
    it("returns the next page number when more pages remain", () => {
        expect(getNextVendorsPage({ page: 1, totalPages: 4, data: [] })).toBe(2);
    });

    it("returns undefined when on the last page", () => {
        expect(getNextVendorsPage({ page: 4, totalPages: 4, data: [] })).toBeUndefined();
    });

    it("returns undefined if page somehow exceeds totalPages", () => {
        expect(getNextVendorsPage({ page: 5, totalPages: 4, data: [] })).toBeUndefined();
    });

    it("returns undefined when there is only a single page total", () => {
        expect(getNextVendorsPage({ page: 1, totalPages: 1, data: [] })).toBeUndefined();
    });
});
