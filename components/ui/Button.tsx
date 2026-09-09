import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline";
type Size = "sm" | "md" | "lg";

interface SharedProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = SharedProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = SharedProps & { href?: undefined } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-heading font-semibold " +
  "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] whitespace-nowrap select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.8rem]",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-brand text-white shadow-glass hover:-translate-y-0.5 hover:shadow-glass-lg active:translate-y-0",
  secondary:
    "glass-panel text-brand-ink hover:-translate-y-0.5 hover:shadow-glass-lg hover:text-brand-teal-deep active:translate-y-0",
  outline:
    "border border-brand-teal/40 bg-white/50 text-brand-teal-deep backdrop-blur-sm hover:bg-brand-teal-tint hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-brand-ink hover:text-brand-teal-deep underline-offset-4 hover:underline",
  light:
    "bg-white text-brand-teal-deep shadow-glass hover:-translate-y-0.5 hover:bg-brand-teal-tint active:translate-y-0",
};

/** Single source of truth for every button / button-link on the site. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", withArrow = false, className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <Icon
          name="arrow"
          className="h-4 w-4 shrink-0 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
