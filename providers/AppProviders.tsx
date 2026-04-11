"use client"

import { AuthProvider } from "@/context/AuthProvider"
import { CartProvider } from "@/context/CartProvider"
import { Cart } from "@/types/Cart"
import { useReducer } from "react"

export function AppProviders({ children }: { children: React.ReactNode }) {

    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    )
}