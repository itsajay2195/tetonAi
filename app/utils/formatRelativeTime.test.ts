import { formatRelativeTime } from "./formatRelativeTime";

describe("formatRelativeTime", () => {
    const now = new Date("2026-01-15T12:00:00.000Z");

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(now);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const minutesAgo = (n: number) => new Date(now.getTime() - n * 60 * 1000).toISOString();
    const hoursAgo = (n: number) => minutesAgo(n * 60);
    const daysAgo = (n: number) => hoursAgo(n * 24);

    it("returns 'just now' for under a minute", () => {
        expect(formatRelativeTime(minutesAgo(0))).toBe("just now");
    });

    it("uses singular for exactly 1 minute", () => {
        expect(formatRelativeTime(minutesAgo(1))).toBe("1 min ago");
    });

    it("uses plural for multiple minutes", () => {
        expect(formatRelativeTime(minutesAgo(5))).toBe("5 mins ago");
    });

    it("uses singular for exactly 1 hour", () => {
        expect(formatRelativeTime(hoursAgo(1))).toBe("1 hr ago");
    });

    it("uses plural for multiple hours", () => {
        expect(formatRelativeTime(hoursAgo(3))).toBe("3 hrs ago");
    });

    it("uses singular for exactly 1 day", () => {
        expect(formatRelativeTime(daysAgo(1))).toBe("1 day ago");
    });

    it("uses plural for multiple days", () => {
        expect(formatRelativeTime(daysAgo(2))).toBe("2 days ago");
    });

    it("switches to weeks past 7 days", () => {
        expect(formatRelativeTime(daysAgo(14))).toBe("2 weeks ago");
    });

    it("switches to months past 4 weeks", () => {
        expect(formatRelativeTime(daysAgo(60))).toBe("2 months ago");
    });

    it("switches to years past 12 months", () => {
        expect(formatRelativeTime(daysAgo(400))).toBe("1 year ago");
    });
});
