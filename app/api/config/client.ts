import { getBaseUrl } from "./api";
import { getClientId } from "./clientId";

export async function apiFetch(path: string, options: RequestInit = {}) {
    const clientId = await getClientId();
    const response = await fetch(`${getBaseUrl()}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "X-Client-Id": clientId,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed: ${response.status}`);
    }

    return response.json();
}
