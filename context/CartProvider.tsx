"use client"
import { createContext, useContext, useReducer, ReactNode } from "react"
import { produce } from "immer"
import { Cart, CartAction, CartContextType } from "../types/Cart"


const CartContext = createContext<CartContextType | null>(null)



const cartReducer = produce((draft: Cart, action: CartAction) => {
    switch (action.type) {
        case "add_to_cart": {
            draft.products.push({ ...action.cartItem })
            draft.totQuantity += action.quantity
            break
        }

        case "update_cart": {
            const item = draft.products.find(
                (p) => p.id === action.cartItem.id
            )

            if (item) {
                item.quantity = action.quantity
            }

            draft.totQuantity = draft.products.reduce(
                (acc, curr) => acc + curr.quantity,
                0
            )
            break
        }

        default:
            throw new Error("Unknown action")
    }
})

export function CartProvider({ children }: { children: ReactNode }) {
    const initialCart: Cart = {
        products: [],
        totQuantity: 0,
    }

    const [cart, dispatch] = useReducer(cartReducer, initialCart)

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used inside CartProvider")
    }
    return context
}
