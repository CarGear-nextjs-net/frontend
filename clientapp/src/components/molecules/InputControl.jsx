import { cn } from '@/lib/utils';
import * as React from 'react';
import { Input } from '../ui/input';
import FieldControl from './FieldControl';


const InputControl = React.forwardRef(
  (
    {
      className = '',
      classProps,
      label,
      control,
      name,
      rules,
      min,
      max,
      disabled = false,
      step = 1,
      type = 'text',
      suffixIcon,
      prefixIcon,
      required = false,
      onChange,
      maxLength,
      notAllowSpace = false,
      isTrimText = true,
      numberOnly = false,
      prefixIconClassName,
      autoFocus = false,
      onBlur,
      variant = false,
      ...props
    },
    ref
  ) => {
    const classOverride = cn(
      'rounded-[0.5rem] py-[0.75rem] pl-4 border-solid bg-transparent border-[#D8D8D8] text-[#1F1F1F] placeholder:text-placeholder-input placeholder:text-sm h-[3rem] placeholder:text-[#858585]',
      suffixIcon && 'pr-[2.5rem]',
      prefixIcon && 'pl-[2.5rem]',
      disabled && 'bg-mute text-[#B8B8B8] bg-[#F7F7F7]',
      className
    );

    const handleChangeInput = (
      e,
      field
    ) => {
      if (type === 'number') {
        if (max !== undefined && parseFloat(e.target.value) > max) {
          e.target.value = field.value;
          return;
        }
        if (min !== undefined && parseFloat(e.target.value) < min) {
          e.target.value = field.value;
          return;
        }
        if (maxLength !== undefined && e.target.value.length > maxLength) {
          e.target.value = field.value;
          return;
        }
      }

      if (notAllowSpace && e.target.value.includes(' ')) {
        e.target.value = field.value || '';
        return;
      }

      field.onChange(e);
      onChange?.(e);

      if (numberOnly) {
        const {
          target: { value },
        } = e;

        field.onChange({
          target: { value: value.replace(/[^\d]/g, '') },
        });
      }
    };

    return (
      <FieldControl
        control={control}
        name={name}
        rules={rules}
        label={label}
        required={required}
        classProps={classProps}
        renderChildren={(field) => {
          return (
            <div>
              <Input
                className={cn(
                  classOverride,
                  className,
                  disabled && 'bg-[#1018280D] border-[#C7C7C7] placeholder:text-[#B8B8B8]',
                  variant && 'placeholder:!text-[#666666] placeholder:font-normal '
                )}
                type={type}
                step={step}
                disabled={disabled}
                {...props}
                {...field}
                ref={ref}
                variant={variant}
                onChange={(e) => handleChangeInput(e, field)}
                onBlur={(e) => {
                  if (isTrimText && e.target.value) {
                    e.target.value = e.target.value.trim();
                    field.onChange(e);
                  }
                  onBlur?.(e);
                  field.onBlur();
                }}
                maxLength={maxLength}
                onPaste={(e) => {
                  if (numberOnly) {
                    const pastedText = e.clipboardData.getData('text');
                    const inputElement = e.target;
                    if (/[a-zA-Z]/.test(pastedText)) {
                      e.preventDefault();
                      inputElement.value = '';
                    }
                  }
                }} 
                autoFocus={autoFocus}
              />
              {suffixIcon && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  {suffixIcon}
                </div>
              )}
              {prefixIcon && (
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400',
                    prefixIconClassName
                  )}
                >
                  {prefixIcon}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }
);

InputControl.displayName = 'InputControl';

export default InputControl;
