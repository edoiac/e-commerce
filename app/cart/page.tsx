"use client"
import { useContext } from "react"
import CartItem from "../../components/cartitem/CartItem"
import { useCart } from "@/context/CartProvider"

const CartPage = () => {
    const { cart } = useCart()
    return (
        <div className="px-20">
            <main className="flex py-10">
                {cart && cart.products.map((cartItem, i) => <CartItem cartItem={cartItem} key={`${cartItem.id}-${i}`} />)}
            </main>
        </div>
    )
}

export default CartPage