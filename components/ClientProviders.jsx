"use client"

import { CartProvider } from "@/contexts/CartContext"

export default function ClientProviders({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}
