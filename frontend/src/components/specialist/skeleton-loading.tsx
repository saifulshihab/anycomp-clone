function SpecialistSkeleton() {
  return (
    <div className="flex animate-pulse flex-col items-start gap-4 md:flex-row">
      {/* Left Column - Main Content */}
      <div className="w-full flex-1 md:w-auto">
        {/* Title Skeleton */}
        <div className="mb-4">
          <div className="h-8 w-3/4 rounded-md bg-gray-200"></div>
        </div>

        {/* Media Grid Skeleton */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {/* Main Image Skeleton */}
          <div className="h-112.5 rounded-md bg-gray-200"></div>

          {/* Side Images Skeleton */}
          <div className="flex h-full flex-col gap-2">
            <div className="flex-1 rounded-md bg-gray-200"></div>
            <div className="flex-1 rounded-md bg-gray-200"></div>
          </div>
        </div>

        {/* Description Section Skeleton */}
        <div className="mt-6">
          <div className="mb-3 h-6 w-32 rounded-md bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-full rounded-md bg-gray-200"></div>
            <div className="h-4 w-full rounded-md bg-gray-200"></div>
            <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
            <div className="h-4 w-4/6 rounded-md bg-gray-200"></div>
          </div>
        </div>

        {/* Additional Offerings Skeleton */}
        <div className="mt-6">
          <div className="mb-3 h-6 w-40 rounded-md bg-gray-200"></div>
          <div className="flex flex-wrap gap-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex max-w-xs min-w-45 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 h-5 w-3/4 rounded-md bg-gray-200"></div>
                <div className="mt-1 space-y-2">
                  <div className="h-3 w-full rounded-md bg-gray-200"></div>
                  <div className="h-3 w-5/6 rounded-md bg-gray-200"></div>
                </div>
                <div className="mt-2 h-4 w-20 rounded-md bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Pricing Card */}
      <div className="w-full md:w-100">
        <div className="flex justify-end gap-3">
          <div className="h-10" />
        </div>
        <div className="mt-3 box-border flex h-100 flex-col rounded-lg border border-gray-300 p-5">
          {/* Header Skeleton */}
          <div>
            <div className="mb-2 h-7 w-40 rounded-md bg-gray-200"></div>
            <div className="h-4 w-48 rounded-md bg-gray-200"></div>
          </div>

          {/* Price Display Skeleton */}
          <div className="flex items-center justify-center py-5">
            <div className="mt-3 h-10 w-32 rounded-md bg-gray-200"></div>
          </div>

          {/* Price Breakdown Skeleton */}
          <div className="mt-auto">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-24 rounded-md bg-gray-200"></div>
                <div className="h-5 w-20 rounded-md bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-5 w-28 rounded-md bg-gray-200"></div>
                <div className="h-5 w-20 rounded-md bg-gray-200"></div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-gray-200"></div>

            <div className="flex justify-between">
              <div className="h-5 w-16 rounded-md bg-gray-200"></div>
              <div className="h-5 w-24 rounded-md bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialistSkeleton;
