"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Star, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/lib/supabase"

export default function ProductPage() {
  const params = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [activeAccordion, setActiveAccordion] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const id = Number.parseInt(params.pid)

      // Get the product by ID
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single()

      if (error || !productData) {
        setProduct(null)
        setLoading(false)
        return
      }

      setProduct(productData)

      // Get related products (same category, different id)
      const { data: related, error: relatedError } = await supabase
        .from("products")
        .select("*")
        .eq("category", productData.category)
        .neq("id", id)
        .limit(4)

      if (!relatedError) {
        setRelatedProducts(related)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [params.pid])

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-pulse bg-gray-200 aspect-square rounded-lg" />
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-8 rounded" />
            <div className="animate-pulse bg-gray-200 h-6 w-32 rounded" />
            <div className="animate-pulse bg-gray-200 h-12 w-24 rounded" />
            <div className="animate-pulse bg-gray-200 h-20 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square relative border-2 border-gray-200 rounded-md overflow-hidden"
              >
                <Image
                  src={product.image_url || "/placeholder.svg?height=150&width=150"}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white-900">{product.name}</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                product.stock > 10 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <p className="text-4xl font-bold text-blue-600">${product.price}</p>
          <p className="text-white-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-white-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-white-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          {/* Accordion */}
          <div className="space-y-2">
            {/* Specifications */}
            <div className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full px-4 py-3 flex justify-between"
              >
                <span>Specifications</span>
                {activeAccordion === "specs" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {activeAccordion === "specs" && product.specifications && (
                <div className="px-4 pb-4">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <dt className="font-medium text-white-900 w-1/3">{key}:</dt>
                        <dd className="text-blue-700">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            {/* Shipping & Returns */}
            <div className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full px-4 py-3 flex justify-between"
              >
                <span>Shipping & Returns</span>
                {activeAccordion === "shipping" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {activeAccordion === "shipping" && (
                <div className="px-4 pb-4 text-blue-700">
                  <p className="mb-2">• Free shipping on orders over $50</p>
                  <p className="mb-2">• Standard delivery: 3–5 business days</p>
                  <p className="mb-2">• Express delivery: 1–2 business days</p>
                  <p>• 30-day return policy</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
