export default function SkeletonLoader({ className = "" }) {
  return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <SkeletonLoader className="aspect-square" />
      <div className="p-4">
        <SkeletonLoader className="h-6 mb-2" />
        <SkeletonLoader className="h-4 w-24 mb-2" />
        <SkeletonLoader className="h-8 w-20 mb-4" />
        <div className="flex space-x-2">
          <SkeletonLoader className="flex-1 h-10" />
          <SkeletonLoader className="w-12 h-10" />
        </div>
      </div>
    </div>
  )
}
