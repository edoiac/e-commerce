"use client"

import { useAuth } from "@/context/AuthProvider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedLayoutInterface {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutInterface) {
    const { accessToken, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !accessToken) {
            router.replace("/login")
        }
    }, [accessToken, isLoading, router])

    if (isLoading) return <div>Loading...</div>
    if (!accessToken) return null

    return <>{children}</>
}