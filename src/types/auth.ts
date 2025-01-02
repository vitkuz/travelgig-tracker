import type {SavedFilter} from "@/types/filters";

export interface UserProfile {
    userId: string;
    firstName: string;
    lastName?: string;
    balance: number;
    createdAt: string;
    filters?: SavedFilter[]
}

export interface AuthUser {
    userId: string;
    secret: string;
    isAuthenticated: boolean;
    profile: UserProfile;
}

export interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
    login: (userId: string, secret: string) => Promise<void>;
    logout: () => void;
}