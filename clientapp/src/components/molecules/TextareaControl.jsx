import { cn } from "@/lib/utils";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import FieldControl from "./FieldControl";

const TextareaControl = React.forwardRef(
  (
    {
      className = "",
      classProps = {},
      label,
      control,
      name,
      rules,
      rows = 3,
      resize = "none",
      disabled = false,
      required = false,
      maxLength = 200,
      showMaxLength = false,
      autoFocus = false,
      setIsFocus,
      ...props
    },
    ref
  ) => {
    const classOverride = cn(
      "rounded-[0.375rem] py-[0.75rem] pl-4 border-solid bg-transparent border-[#D9D9D9] text-[#1F1F1F] placeholder:text-[#A8A8A8] placeholder:text-sm placeholder:text-[#858585]",
      resize,
      className,
      disabled ? "bg-[#1018280D] border-[#C7C7C7] text-[#B8B8B8]" : ""
    );

    return (
      <FieldControl
        control={control}
        name={name}
        label={label}
        rules={rules}
        required={required}
        classProps={classProps}
        renderChildren={({ value, onChange, onBlur }) => (
          <div>
            <Textarea
              className={cn(classOverride)}
              ref={ref}
              disabled={disabled}
              rows={rows}
              value={value}
              maxLength={maxLength}
              onChange={(e) => {
                onChange(e);
                props.onChange?.(e);
              }}
              {...props}
              onBlur={(e) => {
                const trimmedValue = e.target.value.trim();
                onChange(trimmedValue);
                onBlur();
                setIsFocus?.(false);
              }}
              onKeyDown={props.onKeyDown}
              autoFocus={autoFocus}
              onFocus={() => {
                setIsFocus?.(true);
              }}
            />
            {showMaxLength && (
              <div
                className={cn("text-end", value.length > maxLength ? "text-red-500" : "")}
              >{`${value?.length || 0}/${maxLength}`}</div>
            )}
          </div>
        )}
      />
    );
  }
);

TextareaControl.displayName = "TextareaControl";

export default TextareaControl;
