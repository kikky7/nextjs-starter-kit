import { cva, VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { FaCircleNotch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "on-focus-visible inline-flex items-center justify-center rounded-md text-base font-medium leading-tight transition-colors focus:ring-offset-2 focus:ring-offset-white active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-white hover:bg-zinc-700",
      },
      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4 text-sm",
        circle: "h-12 w-12 rounded-full md:h-14 md:w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  processing?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, size, className, processing, ...props }, ref) => {
    return (
      <button
        className={twMerge(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={processing}
        {...props}
      >
        {processing ? (
          <FaCircleNotch className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

export { Button, buttonVariants };
