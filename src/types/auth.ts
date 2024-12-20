export interface AuthUser {
    userId: string;
    secret: string;
    isAuthenticated: boolean;
}

export interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
    login: (userId: string, secret: string) => Promise<void>;
    logout: () => void;
}