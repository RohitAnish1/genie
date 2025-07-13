// ==========================================
// HOMEPAGE COMPONENT - MAIN LANDING PAGE
// ==========================================
// This is the main homepage that users see when they visit the site.
// It includes a hero section, featured products, and company features.
// Data is fetched from Supabase database in real-time.

"use client"

// React hooks for state management and side effects
import { useState, useEffect } from "react"
// Next.js components for routing and optimized images
import Link from "next/link"
import Image from "next/image"
// Custom components for displaying products and loading states
import ProductCard from "@/components/ProductCard"
import { ProductCardSkeleton } from "@/components/SkeletonLoader"
// Supabase client for database operations
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  // Store the first 4 products to display as featured
  const [featuredProducts, setFeaturedProducts] = useState([])
  // Store all products for potential future use
  const [allProducts, setAllProducts] = useState([])
  // Loading state to show skeleton loaders while fetching data
  const [loading, setLoading] = useState(true)

  // ==========================================
  // DATA FETCHING FROM SUPABASE
  // ==========================================
  // useEffect hook runs once when component mounts to fetch products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      
      // Query Supabase 'products' table to get all product data
      const { data, error } = await supabase
        .from("products")
        .select("*")
      
      // Handle error case - reset products and log error
      if (error) {
        console.error("Error fetching products from Supabase:", error)
        setFeaturedProducts([])
        setAllProducts([])
      } else {
        // Success case - set featured products (first 4) and all products
        setFeaturedProducts(data ? data.slice(0, 4) : [])
        setAllProducts(data || [])
      }
      
      // Stop loading animation
      setLoading(false)
    }
    fetchProducts()
  }, []) // Empty dependency array means this runs only once on mount

  return (
    <div>
      {/* ========================================== */}
      {/* HERO SECTION - MAIN BANNER */}
      {/* ========================================== */}
      {/* Large banner with gradient background and call-to-action */}
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600">
        {/* Background image with overlay effect */}
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=500&width=1200" alt="Hero" fill className="object-cover opacity-20" />
        </div>
        
        {/* Hero content - positioned over background */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Discover Amazing Products</h1>
            {/* Subheading */}
            <p className="text-xl md:text-2xl mb-8">Shop the latest trends with unbeatable prices and fast shipping</p>
            {/* Call-to-action button that links to shop page */}
            <Link
              href="/shop"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FEATURED PRODUCTS SECTION */}
      {/* ========================================== */}
      {/* Display the first 4 products from Supabase as featured items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Check out our most popular items</p>
          </div>

          {/* Product grid - responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? // Show skeleton loaders while data is being fetched
                Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : // Show actual product cards with data from Supabase
                featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      // Pass image_url from Supabase to the ProductCard component
                      image: product.image_url 
                    }}
                  />
                ))}
          </div>

          {/* Link to view all products */}
          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary text-gray-900 px-10 py-6">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* COMPANY FEATURES SECTION */}
      {/* ========================================== */}
      {/* Display key selling points: shipping, guarantee, support */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Three-column grid for features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: Free Shipping */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* SVG icon for shipping */}
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>

            {/* Feature 2: Quality Guarantee */}
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* SVG icon for quality guarantee */}
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>

            {/* Feature 3: 24/7 Support */}
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {/* SVG icon for support */}
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}
