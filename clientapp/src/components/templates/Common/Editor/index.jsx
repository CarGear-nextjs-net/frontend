"use client";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

const Editor = forwardRef(
  (
    {
      className = "",
      classProps,
      label,
      control,
      name,
      rules,
      disabled = false,
      required = false,
      height,
      onTextChange,
      onSelectionChange,
      onChange,
      toolbarOptionsProps,
      defaultValue = "",
      nextElement,
    },
    ref
  ) => {
   
    return (
      <FormField
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => {
          return (
            <FormItem className={cn("space-y-1", classProps?.item)}>
              {label && (
                <Label className={cn("text-[#1F1F1F]", classProps?.label)}>
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
              )}
              <FormControl>
                <div className={cn("relative w-full", classProps?.box)}>
                  <QuillEditor
                    readOnly={disabled}
                    ref={ref}
                    defaultValueHtml={defaultValue}
                    className={className}
                    height={height}
                    onChange={(value) => {
                      onChange?.(value);
                      field.onChange(value);
                      field.onBlur();
                    }}
                    onSelectionChange={onSelectionChange}
                    onTextChange={onTextChange}
                    onBlur={field.onBlur}
                    toolbarOptionsProps={toolbarOptionsProps}
                    nextElement={nextElement}
                  />
                </div>
              </FormControl>
              <FormMessage className={cn("text-xs", classProps?.message)} />
            </FormItem>
          );
        }}
      />
    );
  }
);

Editor.displayName = "Editor";

export default Editor;
