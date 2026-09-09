import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
}

/** Five-star rating with an accessible label. */
export function Rating({ value, max = 5, className }: RatingProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${value} / ${max}`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={cn(
            "h-4 w-4",
            i < Math.round(value)
              ? "fill-brand-pink text-brand-pink"
              : "fill-transparent text-brand-line"
          )}
        />
      ))}
    </div>
  );
}
