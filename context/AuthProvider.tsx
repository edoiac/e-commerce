"use client"

import { AuthContextType } from "@/types/Auth"
import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const saveAccessToken = (token: string) => {
        setAccessToken(token)
    }

    const logout = async () => {
        await fetch("http://localhost:8080/auth/logout", {
            method: "POST",
            credentials: "include"
        })
        setAccessToken(null)
    }

    const refresh = async () => {
        try {
            const res = await fetch("http://localhost:8080/auth/refresh", {
                method: "POST",
                credentials: "include"
            })

            if (!res.ok) return false

            const data = await res.json()
            setAccessToken(data.accessToken)
            return true
        } catch {
            return false
        }
    }

    // 🔥 AUTO REFRESH ON APP LOAD
    useEffect(() => {
        const initAuth = async () => {
            const success = await refresh()
            if (!success) {
                setAccessToken(null)
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{ accessToken, saveAccessToken, logout, refresh, isLoading, isAuthenticated: !!accessToken }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }
    return context
}