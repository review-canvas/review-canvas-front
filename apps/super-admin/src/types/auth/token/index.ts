export interface TokenStore {
    accessToken: string | null;
    setAccessToken: (_accessToken: string) => void;
}