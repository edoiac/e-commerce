"use client"
import { useAuth } from "@/context/AuthProvider";
import Product from "../components/product/Product";
import { ProductData } from "../data/ProductData";

export default function Home() {

  const { accessToken } = useAuth()
  console.log("questo è l'access token", accessToken)

  return (
    <div className="px-20">
      <main className="flex justify-around py-10">
        {ProductData.map(product => <Product key={product.id} product={product} />)}
      </main>
    </div>
  );
}
