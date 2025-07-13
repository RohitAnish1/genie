// ==========================================
// PRODUCT CARD COMPONENT - REUSABLE PRODUCT DISPLAY
// ==========================================
// This component displays individual product information in a card format.
// Used throughout the app (homepage, shop page, related products, etc.)
// Handles product display, ratings, cart functionality, and navigation.

"use client"

// Next.js optimized image component
import Image from "next/image"
// Next.js routing component
import Link from "next/link"
// Lucide React icons for UI elements
import { Star, ShoppingCart, Eye } from "lucide-react"
// Cart context for adding products to cart
import { useCart } from "@/contexts/CartContext"

export default function ProductCard({ product }) {
  // ==========================================
  // CART FUNCTIONALITY
  // ==========================================
  // Get addToCart function from cart context
  const { addToCart } = useCart()

  // ==========================================
  // STAR RATING DISPLAY FUNCTION
  // ==========================================
  // Renders 5 stars with filled/unfilled based on product rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        // Conditional styling: yellow filled for rating, gray for empty
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  // ==========================================
  // ADD TO CART HANDLER
  // ==========================================
  // Handle add to cart button click
  const handleAddToCart = (e) => {
    // Prevent event bubbling to parent elements
    e.preventDefault()
    // Add current product to cart using context function
    addToCart(product)
  }

  return (
    // ==========================================
    // CARD CONTAINER
    // ==========================================
    // Main card with hover effects and shadow
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* ========================================== */}
      {/* PRODUCT IMAGE SECTION */}
      {/* ========================================== */}
      <div className="relative aspect-square">
        {/* Product image with fallback to placeholder */}
        <Image
          // Use product image from Supabase or fallback to placeholder
          src={product.image_url && product.image_url.trim() !== "" ? product.image_url : "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
        />
        
        {/* Low stock indicator - only show if stock is below 10 */}
        {product.stock < 10 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>

      {/* ========================================== */}
      {/* PRODUCT INFORMATION SECTION */}
      {/* ========================================== */}
      <div className="p-4">
        
        {/* Product name - truncated with line-clamp for consistent height */}
        <h3 className="font-semibold text-blue-900 mb-2 line-clamp-2">{product.name}</h3>

        {/* ========================================== */}
        {/* RATING DISPLAY */}
        {/* ========================================== */}
        <div className="flex items-center mb-2">
          {/* Star rating visual display */}
          <div className="flex">{renderStars(product.rating)}</div>
          {/* Numeric rating display */}
          <span className="text-sm text-blue-900 ml-2">({product.rating})</span>
        </div>

        {/* ========================================== */}
        {/* PRICE DISPLAY */}
        {/* ========================================== */}
        <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>

        {/* ========================================== */}
        {/* ACTION BUTTONS */}
        {/* ========================================== */}
        <div className="flex space-x-2">
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart} 
            className="flex-1 btn-primary flex items-center text-gray-600 justify-center space-x-2"
          >
            {/* Shopping cart icon */}
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>

          {/* View Product Details Button */}
          <Link 
            href={`/product/${product.id}`} 
            className="btn-secondary flex items-center text-gray-600 justify-center px-3"
          >
            {/* Eye icon for "view details" */}
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
