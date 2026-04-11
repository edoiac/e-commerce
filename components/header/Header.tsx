"use client"
import Cart from "../icons/cart/Cart"
import Logo from "../icons/logo/Logo"
import User from "../icons/user/User"
import SearchBar from "../searchbar/SearchBar"
import Link from "next/link"
import { useCart } from "@/context/CartProvider"
import { useAuth } from "@/context/AuthProvider"
import Favourite from "../icons/favourite/Favourite"

const Header = () => {
    const { cart } = useCart()
    const { isAuthenticated, logout } = useAuth()
    return (
        <header className="w-full bg-blue-300 px-20 flex flex-row items-center">
            <Link href={'/'}>
                <Logo />
            </Link>
            <SearchBar />
            <div className="basis-auto px-10">
                {isAuthenticated &&
                    <Link href={'/profile'}>
                        <User />
                    </Link>}
            </div>
            <div className="basis-auto pl-5 relative">
                <Link href={'/cart'}>
                    <Cart />
                </Link>
                <span className="absolute inline-block w-2 bottom-[-10px] right-[-11px]">{cart?.totQuantity}</span>
            </div>
            <div className="basis-auto px-10">
                {isAuthenticated &&
                    <Link href={'/favourites'}>
                        <Favourite />
                    </Link>
                }
            </div>
            <div className="basis-auto px-10">
                {isAuthenticated &&
                    <button className="rounded-md border-1 border-gray-500 bg-white w-auto h-10 px-10" onClick={logout} type="button">Logout</button>}
            </div>
            <div className="basis-auto">
                {!isAuthenticated &&
                    <Link href={'/login'}>
                        <button className="rounded-md border-1 border-gray-500 bg-white w-auto h-10 px-10" type="button">Login</button>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header