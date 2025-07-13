// ==========================================
// CLIENT PROVIDERS COMPONENT - HYDRATION WRAPPER
// ==========================================
// This component wraps the entire application with client-side providers.
// Necessary for resolving hydration mismatches between server and client rendering.
// Ensures context providers only run on the client side.

"use client"

// Cart context provider for global cart state management
import { CartProvider } from "@/contexts/CartContext"

export default function ClientProviders({ children }) {
  // ==========================================
  // PROVIDER WRAPPER
  // ==========================================
  // Wraps children with all necessary client-side providers
  // Currently includes CartProvider for global cart state
  // Can be extended with additional providers (auth, theme, etc.)
  
  return (
    <CartProvider>
      {/* All children components will have access to cart context */}
      {children}
    </CartProvider>
  )
}

// ==========================================
// USAGE NOTES
// ==========================================
// This component is used in layout.jsx to wrap the entire app
// The "use client" directive ensures this only runs on client side
// Prevents hydration mismatches between server and client rendering
// Essential for React Context API to work properly in Next.js 13+ App Router
