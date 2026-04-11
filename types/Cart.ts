import { Product } from "./Product"

export type Cart = {
    id?: number
    products: Product[]
    userId?: number
    totQuantity: number
}

export type CartAction = {
    type: string
    cartItem: Product
    quantity: number
}

export type CartContextType = {
    cart: Cart
    dispatch: React.Dispatch<CartAction>
}
