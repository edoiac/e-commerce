import Image from 'next/image'
import React, { ChangeEvent, FC, FocusEventHandler, ReactEventHandler, useContext, useState } from 'react'
import Delete from '../icons/delete/Delete'
import { Product } from '@/types/Product'
import { useCart } from '@/context/CartProvider'

const CartItem: FC<{ cartItem: Product }> = ({ cartItem }) => {
    const { cart, dispatch } = useCart()
    const [quantity, setQuantity] = useState<string>(String(cartItem.quantity))
    const updateQuantity = (ev: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setQuantity(ev.target.value)
    }
    const updateCartWithQuantity: FocusEventHandler<HTMLInputElement> = () => {
        const parsed = parseInt(quantity, 10)

        if (!dispatch) return

        if (isNaN(parsed)) {
            setQuantity(String(cartItem.quantity))
            return
        }

        dispatch({
            type: 'update_cart',
            quantity: parsed,
            cartItem
        })
    }

    return (
        <div className='flex rounded-md border-1 border-gray-500 bg-white p-5 gap-3 w-200 h-20 items-center justify-between'>
            <div>
                <Image alt='cart Item img' width={100} height={70} src={'/products/apple-mini.webp'} />
            </div>
            <div>
                {cartItem.title}
            </div>
            <div>
                € {cartItem.price}
            </div>
            <div>
                <label className='pr-3' htmlFor="prod-quantity">Qty</label>
                <input type="number" name='prod-quantity' onChange={updateQuantity} onBlur={updateCartWithQuantity} value={quantity} className='w-15 rounded-md border-1 border-gray-500 px-2' max={10} />
            </div>
            <div>
                <button type='button' className='align-middle'>
                    <Delete />
                </button>
            </div>
        </div>
    )
}

export default CartItem