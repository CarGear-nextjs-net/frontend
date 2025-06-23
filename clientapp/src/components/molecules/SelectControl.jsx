"use client";

import { cn } from "@/lib/utils";
import { isEmpty } from "lodash";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FieldControl from "./FieldControl";

const SelectControl = React.forwardRef(
  (
    {
      options = [],
      name,
      label,
      classProps,
      placeholder,
      onChange,
      className,
      defaultValue,
      disabled = false,
      required = false,
      rules,
      control,
      notAllowClear = false,
      widthClass,
      ...props
    },
    ref
  ) => {
    const classOverride = cn(
      "h-[2.5rem] w-full py-[0.75rem]",
      className,
      disabled ? "bg-[#1018280D] border-[#C7C7C7] !text-[#B8B8B8]" : "!text-[#1F1F1F]",
      options.length == 0 && "cursor-not-allowed",
      widthClass
    );

    const refSelect = React.useRef(null);

    const listOption = [...options];

    return (
      <FieldControl
        control={control}
        name={name}
        rules={rules}
        label={label}
        required={required}
        classProps={{
          ...classProps,
          box: cn(widthClass, classProps?.box),
        }}
        renderChildren={(field) => {
          return (
            <Select
              onValueChange={(e) => {
                if (!isEmpty(e)) {
                  field.onChange(e);
                  onChange?.(e);
                  field.onBlur();
                  if (refSelect.current) {
                    refSelect.current.blur();
                  }
                }
              }}
              disabled={disabled}
              aria-required={required}
              defaultValue={defaultValue}
              value={field.value}
            >
              <SelectTrigger
                className={cn(classOverride, className)}
               
                disabled={disabled || !listOption || listOption.length === 0}
                ref={refSelect}
              >
                <SelectValue
                  placeholder={
                    <span className={cn("text-[#858585]", classProps?.placeholder)}>
                      {placeholder}
                    </span>
                  }
                  defaultValue={defaultValue}
                 
                  {...props}
                  {...field}
                  className={cn(
                    "!text-primary",
                    "max-w-[100%-2rem]",
                    disabled && "!text-[#B8B8B8]"
                  )}
                  ref={ref}
                />
              </SelectTrigger>
              {listOption.length > 0 && (
                <SelectContent className={cn(classProps?.wrapperContent, widthClass)}>
                  <SelectGroup>
                    {listOption.map((d) => (
                      <SelectItem
                        key={d.value}
                        value={d.value}
                        className={cn(
                          "break-all",
                          disabled || d?.disabled ? "!text-[#B8B8B8]" : "text-[#1F1F1F]"
                        )}
                        disabled={disabled || d?.disabled}
                      >
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              )}
            </Select>
          );
        }}
      />
    );
  }
);

export default SelectControl;
