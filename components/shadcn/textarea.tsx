import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    label?: string;
    wrapperClassName?: string;
    message?: string;
    error?: string;
  }
>(({ className, label, wrapperClassName, message, error, ...props }, ref) => {
  return (
    <div className={wrapperClassName}>
      {
        label && (
          <label
            htmlFor={label}
            className="text-sm mb-1.5 text-[#414651] font-medium"
          >
            {label}
          </label>
        )
      }
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error && 'border-red-500',
          className
        )}
        ref={ref}
        {...props}
      />
      {
        message && <div className="text-[#535862] text-sm font-normal mt-1">{message}</div>
      }
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
