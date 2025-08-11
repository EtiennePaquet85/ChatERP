// systems/frontend/chaterp-web/src/utils/httpClient.ts
export class HttpClient {
    private readonly baseUrl: string;
    private readonly photoBaseUrl: string;

    constructor(baseUrl?: string, photoBaseUrl?: string) {
        // Utilisé dans les tests, si fourni
        if (baseUrl && photoBaseUrl) {
            this.baseUrl = baseUrl;
            this.photoBaseUrl = photoBaseUrl;
            return;
        }

        // Vite injecte les variables d’environnement au runtime
        const localApiUrl = import.meta.env.VITE_BACKEND_API_URL_LOCAL;
        const cloudApiUrl = import.meta.env.VITE_BACKEND_API_URL_CLOUD;
        const localPhotoUrl = import.meta.env.VITE_DATABASE_API_URL_LOCAL;
        const cloudPhotoUrl = import.meta.env.VITE_DATABASE_API_URL_CLOUD;

        if (!localApiUrl || !cloudApiUrl || !localPhotoUrl || !cloudPhotoUrl) {
            throw new Error("Les variables d'environnement pour backend et photos doivent être définies !");
        }

        const isLocalhost =
            typeof window !== 'undefined' &&
            (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

        this.baseUrl = isLocalhost ? localApiUrl : cloudApiUrl;
        this.photoBaseUrl = isLocalhost ? localPhotoUrl : cloudPhotoUrl;
    }

    // GET complet pour photos (nouvelle méthode)
    public getPhotoUrl(path: string): string {
        // Assure que le path commence par '/'
        const cleanPath = path.startsWith('/') ? path : '/' + path;
        return `${this.photoBaseUrl}${cleanPath}`;
    }

    public async postAsJsonAsync<T>(path: string, body: unknown): Promise<T> {
        return this.handleRequest<T>('POST', path, body);
    }

    public async getJsonAsync<T>(path: string): Promise<T> {
        return this.handleRequest<T>('GET', path);
    }

    public async putAsJsonAsync<T>(path: string, body: unknown): Promise<T> {
        return this.handleRequest<T>('PUT', path, body);
    }

    public async deleteAsync<T = void>(path: string): Promise<T> {
        return this.handleRequest<T>('DELETE', path);
    }

    private async handleRequest<T>(method: string, path: string, body?: unknown): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        const options: RequestInit = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw await this.extractError(response);
        }

        if (response.status === 204 || response.headers.get('content-length') === '0') {
            return undefined as T;
        }

        return await response.json();
    }

    private async extractError(response: Response): Promise<Error> {
        try {
            const contentType = response.headers.get("content-type");
            if (contentType?.includes("application/json")) {
                const data = await response.json();

                if (typeof data.detail === 'string') {
                    return new Error(data.detail);
                }

                if (Array.isArray(data.errors)) {
                    return new Error(data.errors.join(" | "));
                }

                if (typeof data.message === 'string') {
                    return new Error(data.message);
                }

                return new Error(JSON.stringify(data));
            }

            const text = await response.text();
            return new Error(text || `HTTP error ${response.status}`);
        } catch {
            return new Error(`HTTP error ${response.status}`);
        }
    }

    public async postFormDataAsync<T>(path: string, formData: FormData): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const options: RequestInit = {
            method: 'POST',
            body: formData,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw await this.extractError(response);
        }

        return await response.json();
    }
}
