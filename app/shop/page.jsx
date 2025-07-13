// ==========================================
// SHOP PAGE - COMPLETE PRODUCT CATALOG WITH FILTERING
// ==========================================
// This page displays all products with advanced filtering capabilities.
// Includes search, category filtering, price range, and pagination.
// Fetches real-time data from Supabase database.

"use client"

// React hooks for state management and side effects
import { useState, useEffect } from "react"
// Lucide React icons for search, filter, and UI elements
import { Search, Filter, ChevronDown } from "lucide-react"
// Custom components for product display and loading states
import ProductCard from "@/components/ProductCard"
import { ProductCardSkeleton } from "@/components/SkeletonLoader"
// Supabase client for database operations
import { supabase } from "@/lib/supabase"

export default function ShopPage() {
  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  // Store all products fetched from database
  const [allProducts, setAllProducts] = useState([])
  // Store filtered products based on user selections
  const [filteredProducts, setFilteredProducts] = useState([])
  // Loading state for skeleton loaders
  const [loading, setLoading] = useState(true)
  // Search functionality state
  const [searchTerm, setSearchTerm] = useState("")
  // Available categories from database
  const [categories, setCategories] = useState(["All"])
  // Currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState("All")
  // Price range filter [min, max]
  const [priceRange, setPriceRange] = useState([0, 300])
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  // Mobile filter visibility toggle
  const [showFilters, setShowFilters] = useState(false)

  // Pagination configuration
  const productsPerPage = 12

  // ==========================================
  // DATA FETCHING FROM SUPABASE
  // ==========================================
  // Fetch all products and extract categories on component mount
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      
      // Query all products from Supabase
      const { data, error } = await supabase
        .from("products")
        .select("*")
      
      if (error) {
        // Handle error case - reset all states
        setAllProducts([])
        setFilteredProducts([])
        setCategories(["All"])
        setLoading(false)
        return
      }
      
      // Success case - set products and extract categories
      setAllProducts(data || [])
      setFilteredProducts(data || [])
      
      // Extract unique categories from fetched products
      const uniqueCategories = [
        "All",
        ...Array.from(new Set((data || []).map((p) => p.category).filter(Boolean)))
      ]
      setCategories(uniqueCategories)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  // ==========================================
  // FILTERING LOGIC
  // ==========================================
  // Apply filters whenever search term, category, or price range changes
  useEffect(() => {
    let filtered = allProducts

    // Apply search filter - case insensitive product name matching
    if (searchTerm) {
      filtered = filtered.filter((product) => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter - exclude "All" category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Apply price range filter - products within min/max price
    filtered = filtered.filter((product) => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Update filtered products and reset to first page
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, priceRange, allProducts])

  // ==========================================
  // PAGINATION CALCULATIONS
  // ==========================================
  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

  // ==========================================
  // PAGINATION COMPONENT
  // ==========================================
  // Reusable pagination component with previous/next and page numbers
  const Pagination = () => (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous page button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Previous
      </button>

      {/* Page number buttons */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 rounded-md ${
            currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next page button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ========================================== */}
        {/* FILTERS SIDEBAR */}
        {/* ========================================== */}
        <div className="lg:w-64">
          
          {/* Mobile filter toggle button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 btn-secondary w-full justify-center"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Filter controls - hidden on mobile unless toggled */}
          <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            
            {/* ========================================== */}
            {/* SEARCH FILTER */}
            {/* ========================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Products</label>
              <div className="relative">
                {/* Search icon */}
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {/* Search input field */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* ========================================== */}
            {/* CATEGORY FILTER */}
            {/* ========================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              {/* Category dropdown populated from database */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* ========================================== */}
            {/* PRICE RANGE FILTER */}
            {/* ========================================== */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              {/* Price range slider */}
              <input
                type="range"
                min="0"
                max="300"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* PRODUCTS GRID SECTION */}
        {/* ========================================== */}
        <div className="flex-1">
          
          {/* Page header with product count */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Shop All Products</h1>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {loading ? (
            // Show skeleton loaders while data is loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* ========================================== */}
              {/* PRODUCT GRID */}
              {/* ========================================== */}
              {/* Responsive grid layout for products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* ========================================== */}
              {/* NO RESULTS MESSAGE */}
              {/* ========================================== */}
              {/* Show message when no products match filters */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              )}

              {/* ========================================== */}
              {/* PAGINATION */}
              {/* ========================================== */}
              {/* Show pagination only if there are multiple pages */}
              {totalPages > 1 && <Pagination />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
