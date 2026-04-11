"use client"

import Image from 'next/image'
import Cart from '../icons/cart/Cart'
import Favourite from '../icons/favourite/Favourite'
import clsx from 'clsx';
import { FC, MouseEventHandler, SubmitEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { Product as ProductType } from '@/types/Product';
import { useCart } from '@/context/CartProvider';

const Product: FC<{ product: ProductType }> = ({ product }) => {
    const [isCartInput, setIsCartInput] = useState<boolean>(false)
    const { dispatch } = useCart()

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (isCartInput) {
            inputRef.current?.focus()
        }
    }, [isCartInput])

    const addToCart = (ev: any) => {
        ev.preventDefault();
        if (!isCartInput) {
            setIsCartInput(true);
            return;
        }
        const prodQuantity = inputRef.current ? parseInt(inputRef.current.value) : 0;
        product.quantity = prodQuantity
        if (prodQuantity > 0 && dispatch) {
            dispatch({
                type: 'add_to_cart',
                cartItem: { ...product },
                quantity: prodQuantity
            });
        }
        setIsCartInput(false);
    };

    const blurOnEscapeKeyPressed = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        if (ev.key === 'Escape') {
            ev.currentTarget.blur()
        }
    }

    return (
        <div className='flex flex-col rounded-md border-1 border-gray-500 bg-white p-5 w-60 h-auto text-center justify-between gap-3' >
            <div>
                <p>{product.title}</p>
            </div>
            <div>
                <Image height={200} width={300} loading="eager" alt='Prod alternative text' src={"/products/apple-mini.webp"} />
            </div>
            <div className='flex-1'>
                <p className='h-full line-clamp-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed risus ac lectus finibus convallis. Praesent accumsan, purus id convallis blandit, ex lorem euismod tellus, eu egestas lacus enim dignissim mi. Suspendisse posuere eget ligula vel consequat. Nam sed tellus eu augue pellentesque feugiat nec eu ante.</p>
            </div>
            <div>
                € <span>{product.price}</span>
            </div>
            <div>
                <form className='flex justify-evenly relative' onSubmit={addToCart}>
                    <button className={
                        clsx(
                            'cursor-pointer transition duration-300 ease-in-out',
                            isCartInput && '-translate-x-11'
                        )
                    } type='button' onMouseDown={addToCart}><Cart /></button>
                    <input type="number" name='prod-quantity' ref={inputRef} onKeyDown={blurOnEscapeKeyPressed} onBlur={(ev) => {
                        ev.target.value = ''
                        setIsCartInput(false)
                    }} className={
                        clsx(
                            'w-15 absolute top-1 left-10 rounded-md border-1 border-gray-500 px-2',
                            !isCartInput && 'hidden',
                        )
                    } />
                    <button className='cursor-pointer' type='button'><Favourite /></button>
                </form>
            </div>
        </div >
    )
}

export default Product