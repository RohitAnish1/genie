// ==========================================
// SHOPPING CART CONTEXT - GLOBAL STATE MANAGEMENT
// ==========================================
// This context provides cart functionality across the entire application.
// Manages cart items, quantities, persistence to localStorage, and cart operations.
// Uses React's useReducer for complex state management and useContext for global access.

"use client"

// React hooks for context creation and state management
import { createContext, useContext, useReducer, useEffect, useState } from "react"

// ==========================================
// CONTEXT CREATION
// ==========================================
// Create context object for sharing cart state across components
const CartContext = createContext()

// ==========================================
// REDUCER FUNCTION - CART STATE MANAGEMENT
// ==========================================
// Handles all cart state changes through dispatched actions
// Each action type represents a different cart operation
const cartReducer = (state, action) => {
  switch (action.type) {
    // ADD_TO_CART: Add item to cart or increment quantity if exists
    case "ADD_TO_CART":
      // Check if item already exists in cart
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        // Item exists: increment quantity by 1
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      // Item doesn't exist: add new item with quantity 1
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }

    // REMOVE_FROM_CART: Completely remove item from cart
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    // UPDATE_QUANTITY: Change quantity of specific item
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    // CLEAR_CART: Remove all items from cart
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    // LOAD_CART: Load cart data from localStorage on app initialization
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
      }

    // Default case: return unchanged state
    default:
      return state
  }
}

// ==========================================
// CART PROVIDER COMPONENT
// ==========================================
// Provides cart context to all child components
// Handles localStorage persistence and hydration
export function CartProvider({ children }) {
  // useReducer for complex cart state management
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  // Track hydration to prevent SSR/client mismatch
  const [hydrated, setHydrated] = useState(false)

  // ==========================================
  // HYDRATION HANDLING
  // ==========================================
  // Handle client-side hydration and load cart from localStorage
  useEffect(() => {
    setHydrated(true)
    // Load cart from localStorage only after hydration
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) })
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
        }
      }
    }
  }, [])

  // ==========================================
  // CART PERSISTENCE
  // ==========================================
  // Save to localStorage only after hydration and when items change
  useEffect(() => {
    if (hydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem("cart", JSON.stringify(state.items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [state.items, hydrated])

  // ==========================================
  // CART ACTION FUNCTIONS
  // ==========================================
  // These functions dispatch actions to the reducer
  
  // Add product to cart
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  // Remove product completely from cart
  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId })
  }

  // Update quantity of item in cart
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove item
      removeFromCart(productId)
    } else {
      // Otherwise, update to new quantity
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
    }
  }

  // Clear all items from cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  // ==========================================
  // CALCULATED VALUES
  // ==========================================
  // Calculate total price of all items in cart
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Calculate total number of items in cart
  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  // ==========================================
  // CONTEXT PROVIDER
  // ==========================================
  // Provide cart state and functions to all child components
  return (
    <CartContext.Provider
      value={{
        // Cart state
        items: state.items,
        // Cart actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        // Calculated values
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ==========================================
// CUSTOM HOOK FOR CART ACCESS
// ==========================================
// Custom hook to access cart context with error handling
export const useCart = () => {
  const context = useContext(CartContext)
  // Ensure hook is used within CartProvider
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
