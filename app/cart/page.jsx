// ==========================================
// SHOPPING CART PAGE - CART MANAGEMENT AND CHECKOUT
// ==========================================
// This page displays all items in the user's shopping cart.
// Provides quantity management, item removal, price calculations,
// and checkout initiation. Integrates with cart context for state management.

"use client"

// React hooks for state management
import { useState } from "react"
// Next.js components for navigation and images
import Link from "next/link"
import Image from "next/image"
// Lucide React icons for cart operations
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
// Cart context for accessing cart state and operations
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  // ==========================================
  // CART STATE AND OPERATIONS
  // ==========================================
  // Destructure cart functions and state from context
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart()
  
  // ==========================================
  // LOCAL STATE
  // ==========================================
  // Promotional code input state
  const [promoCode, setPromoCode] = useState("")

  // ==========================================
  // PRICE CALCULATIONS
  // ==========================================
  // Fixed shipping cost
  const shipping = 9.99
  // Calculate tax as 8% of subtotal
  const tax = getCartTotal() * 0.08
  // Calculate final total (subtotal + shipping + tax)
  const total = getCartTotal() + shipping + tax

  // ==========================================
  // EMPTY CART STATE
  // ==========================================
  // Display empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Empty cart icon */}
          <ShoppingBag className="w-24 h-24 text-blue-400 mx-auto mb-6" />
          {/* Empty cart message */}
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Your cart is empty</h1>
          <p className="text-blue-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          {/* Link to shop page */}
          <Link href="/shop" className="btn-primary text-lg px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-blue-900 mb-8">Shopping Cart</h1>

      {/* ========================================== */}
      {/* MAIN CART LAYOUT */}
      {/* ========================================== */}
      {/* Two-column layout: cart items + order summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ========================================== */}
        {/* CART ITEMS SECTION */}
        {/* ========================================== */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            
            {/* Cart header */}
            <div className="px-6 py-4 border-b border-blue-200">
              <h2 className="text-blue-900 font-semibold">Cart Items ({items.length})</h2>
            </div>

            {/* ========================================== */}
            {/* CART ITEMS LIST */}
            {/* ========================================== */}
            <div className="divide-y divide-blue-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  
                  {/* ========================================== */}
                  {/* PRODUCT IMAGE */}
                  {/* ========================================== */}
                  <div className="flex-shrink-0">
                    <Image
                      // Use Supabase image or fallback to placeholder
                      src={item.image_url && item.image_url.trim() !== "" ? item.image_url : "/placeholder.svg?height=80&width=80"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>

                  {/* ========================================== */}
                  {/* PRODUCT INFO */}
                  {/* ========================================== */}
                  <div className="flex-1 min-w-0">
                    {/* Product name - links to product detail page */}
                    <Link
                      href={`/product/${item.id}`}
                      className="text-lg font-medium text-blue-900 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    {/* Product price */}
                    <p className="text-blue-600">${item.price}</p>
                  </div>

                  {/* ========================================== */}
                  {/* QUANTITY CONTROLS */}
                  {/* ========================================== */}
                  <div className="flex items-center space-x-2">
                    {/* Decrease quantity button */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-blue-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    {/* Current quantity display */}
                    <span className="px-3 py-1 border border-blue-300 rounded text-center min-w-[3rem]">
                      {item.quantity}
                    </span>
                    
                    {/* Increase quantity button */}
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-blue-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ========================================== */}
                  {/* LINE TOTAL */}
                  {/* ========================================== */}
                  {/* Total price for this item (price × quantity) */}
                  <div className="text-lg font-semibold text-blue-900 min-w-[5rem] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* ========================================== */}
                  {/* REMOVE ITEM BUTTON */}
                  {/* ========================================== */}
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* ORDER SUMMARY SIDEBAR */}
        {/* ========================================== */}
        <div className="lg:col-span-1">
          {/* Sticky positioning for better UX */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            
            {/* Summary header */}
            <h2 className="text-blue-900 font-semibold mb-4">Order Summary</h2>

            {/* ========================================== */}
            {/* PRICE BREAKDOWN */}
            {/* ========================================== */}
            <div className="space-y-3 mb-6">
              
              {/* Subtotal */}
              <div className="flex text-blue-900 justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              {/* Shipping cost */}
              <div className="flex text-blue-900 justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              
              {/* Tax calculation */}
              <div className="flex text-blue-900 justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              {/* Final total with visual separation */}
              <div className="border-t pt-3">
                <div className="flex text-blue-900 justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* ========================================== */}
            {/* PROMO CODE SECTION */}
            {/* ========================================== */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-blue-700 mb-2">Promo Code</label>
              <div className="flex space-x-2">
                {/* Promo code input */}
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 text-blue-900 input-field"
                />
                {/* Apply promo code button */}
                <button className="text-blue-900 btn-secondary">Apply</button>
              </div>
            </div>

            {/* ========================================== */}
            {/* ACTION BUTTONS */}
            {/* ========================================== */}
            
            {/* Primary checkout button */}
            <Link href="/checkout" className="w-full btn-primary text-center block text-blue-900 py-3">
              Proceed to Checkout
            </Link>

            {/* Secondary continue shopping button */}
            <Link href="/shop" className="w-full btn-secondary text-center text-blue-900 block mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
