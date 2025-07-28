"use client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CollapsibleComponent({ id, name, selected, option, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-between">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={`w-full flex justify-between items-center cursor-pointer text-left px-3 py-1 rounded hover:bg-red-50 ${selected === id ? "bg-red-100 font-semibold text-red-600" : ""}`}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange(id);
              }}
            >
              {name}
            </span>
            {option.length > 0 &&
              (!isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="flex flex-col gap-2">
        <div className="pl-4 flex flex-col gap-2">
          {option.map((child) => (
            <div key={child.id}>
              <button
                key={child.id}
                type="button"
                className={`w-full cursor-pointer text-left px-2 py-1 rounded hover:bg-red-50 text-sm ${selected === child.id ? "bg-red-100 font-semibold text-red-600" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(child.id);
                }}
              >
                {child.name}
              </button>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
