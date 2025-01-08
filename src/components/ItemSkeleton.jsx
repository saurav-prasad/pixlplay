import React from "react";

function ItemSkeleton() {
  return (
    <>
      <div
        role="status"
        className="w-full space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 px-3 py-3 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32 mb-2.5"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemSkeleton;
