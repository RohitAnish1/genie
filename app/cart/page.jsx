"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const shipping = 9.99
  const tax = getCartTotal() * 0.08
  const total = getCartTotal() + shipping + tax

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link href="/shop" className="btn-primary text-lg px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Cart Items ({items.length})</h2>
            </div>

            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src="/placeholder.svg?height=80&width=80"
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600">${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 border border-gray-300 rounded text-center min-w-[3rem]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-lg font-semibold text-gray-900 min-w-[5rem] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 input-field"
                />
                <button className="btn-secondary">Apply</button>
              </div>
            </div>

            <Link href="/checkout" className="w-full btn-primary text-center block text-lg py-3">
              Proceed to Checkout
            </Link>

            <Link href="/shop" className="w-full btn-secondary text-center block mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
