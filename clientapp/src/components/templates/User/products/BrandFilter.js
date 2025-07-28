"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useState } from "react";

export default function BrandFilter({ brands = [], selectedBrands = [], onChange }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <h4 className="font-medium mb-2 flex items-center justify-between cursor-pointer">
          Thương hiệu
        </h4>
      </CollapsibleTrigger>
      {brands.length > 0 && (
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="pl-2">
            <div className="space-y-2">
              {brands.map((parent) => (
                <button
                  key={parent.brandId}
                  type="button"
                  onClick={() => {
                    onChange(parent.brandId);
                  }}
                  className={`w-full flex justify-between items-center cursor-pointer text-left px-3 py-1 rounded hover:bg-red-50 ${selectedBrands.includes(parent.brandId) ? "bg-red-100 font-semibold text-red-600" : ""}`}
                >
                  {parent.brandName}
                </button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
