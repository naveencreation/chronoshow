import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      data-slot="label"
      className={cn('text-sm leading-none font-medium select-none', className)}
      {...props}
    />
  );
}

export { Label };
