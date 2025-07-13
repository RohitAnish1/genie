// ==========================================
// SKELETON LOADER COMPONENT - LOADING STATE UI
// ==========================================
// This component provides a skeleton loading animation for better UX
// while content is loading. Used throughout the app for product cards,
// pages, and other content that loads asynchronously.

export default function SkeletonLoader({ className = "" }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* ========================================== */}
      {/* SKELETON CARD STRUCTURE */}
      {/* ========================================== */}
      {/* Mimics the structure of a ProductCard component */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* ========================================== */}
        {/* SKELETON IMAGE PLACEHOLDER */}
        {/* ========================================== */}
        {/* Gray rectangle representing product image */}
        <div className="h-48 bg-gray-300"></div>
        
        {/* ========================================== */}
        {/* SKELETON CONTENT SECTION */}
        {/* ========================================== */}
        <div className="p-4 space-y-3">
          
          {/* ========================================== */}
          {/* SKELETON PRODUCT NAME */}
          {/* ========================================== */}
          {/* Two lines to represent product title */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* ========================================== */}
          {/* SKELETON RATING STARS */}
          {/* ========================================== */}
          {/* Horizontal bar representing star rating */}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>

          {/* ========================================== */}
          {/* SKELETON PRICE */}
          {/* ========================================== */}
          {/* Short bar representing price */}
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          {/* ========================================== */}
          {/* SKELETON BUTTON */}
          {/* ========================================== */}
          {/* Full-width bar representing "Add to Cart" button */}
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// USAGE NOTES
// ==========================================
// This component can be used anywhere loading states are needed:
// - Product grids while fetching from Supabase
// - Individual product cards during navigation
// - Search results while filtering
// - Any async content loading scenarios

// The animate-pulse class provides smooth loading animation
// Gray colors (gray-300) provide subtle loading indication
// Structure matches ProductCard for seamless transition
