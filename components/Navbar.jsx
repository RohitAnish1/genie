// ==========================================
// NAVIGATION BAR COMPONENT - MAIN SITE NAVIGATION
// ==========================================
// This component provides the main navigation bar for the entire application.
// Features responsive design, cart badge, search functionality, and user authentication.
// Integrates with cart context for real-time cart count updates.

"use client"

// React hooks for state management
import { useState } from "react"
// Next.js components for navigation
import Link from "next/link"
import { usePathname } from "next/navigation"
// Lucide React icons for navigation elements
import { ShoppingCart, Search, User, Menu, X } from "lucide-react"
// Cart context for accessing cart state
import { useCart } from "@/contexts/CartContext"

export default function Navbar() {
  // ==========================================
  // NAVIGATION STATE
  // ==========================================
  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Search input state
  const [searchQuery, setSearchQuery] = useState("")

  // ==========================================
  // HOOKS AND CONTEXT
  // ==========================================
  // Get cart items for badge count
  const { items } = useCart()
  // Get current pathname for active link styling
  const pathname = usePathname()

  // ==========================================
  // UTILITY FUNCTIONS
  // ==========================================
  // Calculate total items in cart (sum of all quantities)
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  // Check if a nav link is currently active
  const isActiveLink = (path) => pathname === path

  // ==========================================
  // NAVIGATION LINKS CONFIGURATION
  // ==========================================
  // Define main navigation links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* ========================================== */}
      {/* MAIN NAVIGATION BAR */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* ========================================== */}
          {/* LOGO/BRAND SECTION */}
          {/* ========================================== */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              TechStore
            </Link>
          </div>

          {/* ========================================== */}
          {/* DESKTOP NAVIGATION LINKS */}
          {/* ========================================== */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveLink(link.href)
                      ? "bg-blue-900 text-white"  // Active link styling
                      : "text-blue-900 hover:bg-blue-100"  // Inactive link styling
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ========================================== */}
          {/* SEARCH BAR - DESKTOP */}
          {/* ========================================== */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              {/* Search input field */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Search icon */}
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-400" />
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT SIDE ACTIONS */}
          {/* ========================================== */}
          <div className="flex items-center space-x-4">
            
            {/* ========================================== */}
            {/* CART ICON WITH BADGE */}
            {/* ========================================== */}
            <Link href="/cart" className="relative p-2 text-blue-900 hover:bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6" />
              {/* Cart item count badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* ========================================== */}
            {/* USER ACCOUNT ICON */}
            {/* ========================================== */}
            <button className="p-2 text-blue-900 hover:bg-blue-100 rounded-lg">
              <User className="h-6 w-6" />
            </button>

            {/* ========================================== */}
            {/* MOBILE MENU BUTTON */}
            {/* ========================================== */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-blue-900 hover:bg-blue-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />  // Close icon when menu is open
              ) : (
                <Menu className="h-6 w-6" />  // Hamburger icon when menu is closed
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* MOBILE MENU */}
      {/* ========================================== */}
      {/* Conditional rendering based on mobile menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-blue-200">
            
            {/* ========================================== */}
            {/* MOBILE SEARCH BAR */}
            {/* ========================================== */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-400" />
              </div>
            </div>

            {/* ========================================== */}
            {/* MOBILE NAVIGATION LINKS */}
            {/* ========================================== */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "bg-blue-900 text-white"  // Active link styling
                    : "text-blue-900 hover:bg-blue-100"  // Inactive link styling
                }`}
                onClick={() => setIsMobileMenuOpen(false)}  // Close menu on link click
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
