export type AuthContextType = {
    isAuthenticated: boolean
    accessToken: string | null
    saveAccessToken: (token: string) => void
    logout: () => Promise<void>
    refresh: () => Promise<boolean>
    isLoading: boolean
}

