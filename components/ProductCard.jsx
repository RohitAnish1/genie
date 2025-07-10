"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-square">
       <Image
        src={product.image_url && product.image_url.trim() !== "" ? product.image_url : "/placeholder.svg"}
        alt={product.name}
        fill
        className="object-cover"
       />
        {product.stock < 10 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Low Stock</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-blue-900 mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center mb-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-blue-900 ml-2">({product.rating})</span>
        </div>

        <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>

        <div className="flex space-x-2">
          <button onClick={handleAddToCart} className="flex-1 btn-primary flex items-center text-gray-600 justify-center space-x-2">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

          <Link href={`/product/${product.id}`} className="btn-secondary flex items-center text-gray-600 justify-center px-3">
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
