// ==========================================
// PRODUCT DETAIL PAGE - INDIVIDUAL PRODUCT VIEW
// ==========================================
// This page displays detailed information for a specific product.
// Features product images, specifications, quantity selection, cart integration,
// and related products. Uses dynamic routing with product ID parameter.

"use client"

// React hooks for state management and side effects
import { useState, useEffect } from "react"
// Next.js navigation hooks for dynamic routing
import { useParams } from "next/navigation"
// Next.js image optimization component
import Image from "next/image"
// Lucide React icons for UI elements
import { Star, Minus, Plus, ShoppingCart, ChevronDown, ChevronUp } from "lucide-react"
// Components for related products display
import ProductCard from "@/components/ProductCard"
// Cart context for adding items to cart
import { useCart } from "@/contexts/CartContext"
// Supabase client for database operations
import { supabase } from "@/lib/supabase"

export default function ProductPage() {
  // ==========================================
  // HOOKS AND CONTEXT
  // ==========================================
  // Get dynamic route parameter (product ID)
  const params = useParams()
  // Access cart functions from context
  const { addToCart } = useCart()

  // ==========================================
  // COMPONENT STATE
  // ==========================================
  // Current product data
  const [product, setProduct] = useState(null)
  // Related products in same category
  const [relatedProducts, setRelatedProducts] = useState([])
  // Selected quantity for cart
  const [quantity, setQuantity] = useState(1)
  // Track which accordion section is open
  const [activeAccordion, setActiveAccordion] = useState(null)
  // Loading state for data fetching
  const [loading, setLoading] = useState(true)

  // ==========================================
  // DATA FETCHING EFFECT
  // ==========================================
  // Fetch product and related products when component mounts or ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      // Convert string parameter to number for database query
      const id = Number.parseInt(params.pid)

      // ========================================== 
      // FETCH MAIN PRODUCT DATA
      // ==========================================
      // Get the specific product by ID from Supabase
      const { data: productData, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single() // Expect only one result

      // Handle product not found
      if (error || !productData) {
        setProduct(null)
        setLoading(false)
        return
      }

      setProduct(productData)

      // ========================================== 
      // FETCH RELATED PRODUCTS
      // ==========================================
      // Get products in same category (excluding current product)
      const { data: related, error: relatedError } = await supabase
        .from("products")
        .select("*")
        .eq("category", productData.category) // Same category
        .neq("id", id) // Exclude current product
        .limit(4) // Limit to 4 related products

      // Set related products if query successful
      if (!relatedError) {
        setRelatedProducts(related)
      }

      setLoading(false)
    }

    fetchProduct()
  }, [params.pid]) // Re-run when product ID changes

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  
  // Render star rating based on numeric rating
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? "text-yellow-400 fill-current"  // Filled star for rating
            : "text-gray-300"                 // Empty star
        }`}
      />
    ))

  // Handle adding product to cart with selected quantity
  const handleAddToCart = () => {
    // Add product multiple times based on selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  // Toggle accordion sections (specifications, shipping info)
  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  // ==========================================
  // LOADING STATE
  // ==========================================
  // Show skeleton loading while fetching data
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skeleton product image */}
          <div className="animate-pulse bg-gray-200 aspect-square rounded-lg" />
          {/* Skeleton product info */}
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

  // ==========================================
  // PRODUCT NOT FOUND STATE
  // ==========================================
  // Show error message if product doesn't exist
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

  // ==========================================
  // MAIN PRODUCT DISPLAY
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* ========================================== */}
      {/* PRODUCT DETAILS SECTION */}
      {/* ========================================== */}
      {/* Two-column layout: images on left, info on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* ========================================== */}
        {/* PRODUCT IMAGES COLUMN */}
        {/* ========================================== */}
        <div className="space-y-4">
          
          {/* Main product image */}
          <div className="aspect-square relative">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* ========================================== */}
          {/* THUMBNAIL GALLERY */}
          {/* ========================================== */}
          {/* Show 4 thumbnail images (currently duplicates) */}
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

        {/* ========================================== */}
        {/* PRODUCT INFORMATION COLUMN */}
        {/* ========================================== */}
        <div className="space-y-6">
          
          {/* Product title */}
          <h1 className="text-3xl font-bold text-white-900">{product.name}</h1>

          {/* ========================================== */}
          {/* RATING AND STOCK STATUS */}
          {/* ========================================== */}
          <div className="flex items-center space-x-4">
            {/* Star rating display */}
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>
            
            {/* Stock status badge */}
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                product.stock > 10 
                  ? "bg-green-100 text-green-800"  // High stock
                  : "bg-red-100 text-red-800"     // Low stock warning
              }`}
            >
              {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
            </span>
          </div>

          {/* Product price */}
          <p className="text-4xl font-bold text-blue-600">${product.price}</p>
          
          {/* Product description */}
          <p className="text-white-700 leading-relaxed">{product.description}</p>

          {/* ========================================== */}
          {/* QUANTITY SELECTOR */}
          {/* ========================================== */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              {/* Decrease quantity button */}
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="p-2 hover:bg-white-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              {/* Current quantity display */}
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              
              {/* Increase quantity button (limited by stock) */}
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-white-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ========================================== */}
          {/* ADD TO CART BUTTON */}
          {/* ========================================== */}
          <button
            onClick={handleAddToCart}
            className="w-full btn-primary flex items-center justify-center space-x-2 text-lg py-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>

          {/* ========================================== */}
          {/* EXPANDABLE INFORMATION SECTIONS */}
          {/* ========================================== */}
          <div className="space-y-2">
            
            {/* ========================================== */}
            {/* SPECIFICATIONS ACCORDION */}
            {/* ========================================== */}
            <div className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggleAccordion("specs")}
                className="w-full px-4 py-3 flex justify-between"
              >
                <span>Specifications</span>
                {activeAccordion === "specs" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {/* Show specifications if accordion is open and data exists */}
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

            {/* ========================================== */}
            {/* SHIPPING & RETURNS ACCORDION */}
            {/* ========================================== */}
            <div className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full px-4 py-3 flex justify-between"
              >
                <span>Shipping & Returns</span>
                {activeAccordion === "shipping" ? <ChevronUp /> : <ChevronDown />}
              </button>
              {/* Show shipping info if accordion is open */}
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

      {/* ========================================== */}
      {/* RELATED PRODUCTS SECTION */}
      {/* ========================================== */}
      {/* Only show if related products exist */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          {/* Responsive grid for related products */}
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
