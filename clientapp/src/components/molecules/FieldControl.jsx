import * as React from 'react';

import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { Label } from '../ui/label';
const FieldControl = React.forwardRef(
  (
    {
      classProps,
      label,
      description,
      control,
      name,
      rules,
      required = false,
      children,
      renderChildren,
      isCloneElement = true,
      ...props
    },
    ref
  ) => {
    return (
      <FormField
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <FormItem className={cn('space-y-1', classProps?.item)} ref={ref}>
            {label && (
              <Label className={cn('text-[#1F1F1F]', classProps?.label)}>
                {label} {required && <span className="text-red-500 font-inter">*</span>}
              </Label>
            )}
            {description && (
              <p className={cn('text-sm font-normal text-[#525252]', classProps?.description)}>
                {description}
              </p>
            )}
            <FormControl>
              <div className={cn('relative w-full', classProps?.box)}>
                {isCloneElement
                  ? React.cloneElement(renderChildren ? renderChildren(field) : children, {
                      ...props,
                      ...field,
                      onChange: (e) => {
                        props.onChange?.(e);
                        field.onChange(e);
                      },
                      name,
                      control,
                    })
                  : renderChildren?.(field)}
              </div>
            </FormControl>
            <FormMessage className={cn('text-xs', classProps?.message)} />
          </FormItem>
        )}
      />
    );
  }
);

    FieldControl.displayName = "FieldControl";

export default FieldControl;
