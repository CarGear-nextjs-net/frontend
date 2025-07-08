import React from "react";

export default function CategoryFilter({ categories = [], selectedCategory, onChange }) {
  return (
    <div className="space-y-2">
      {categories.map((parent) => (
        <div key={parent.id}>
          <button
            type="button"
            className={`w-full text-left px-2 py-1 rounded hover:bg-red-50 ${selectedCategory === parent.id ? "bg-red-100 font-semibold text-red-600" : ""}`}
            onClick={() => onChange(parent.id)}
          >
            {parent.name}
          </button>
          {parent.children && parent.children.length > 0 && (
            <div className="pl-4 mt-1 space-y-1">
              {parent.children.map((child) => (
                <button
                  key={child.id}
                  type="button"
                  className={`w-full text-left px-2 py-1 rounded hover:bg-red-50 text-sm ${selectedCategory === child.id ? "bg-red-100 font-semibold text-red-600" : ""}`}
                  onClick={() => onChange(child.id)}
                >
                  {child.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 