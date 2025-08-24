import { DeviceTag } from '@/types';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: DeviceTag;
  className?: string;
}

export const TagBadge = ({ tag, className }: TagBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        tag === "PC" 
          ? "bg-tag-pc/20 text-tag-pc border border-tag-pc/30" 
          : "bg-tag-mobile/20 text-tag-mobile border border-tag-mobile/30",
        className
      )}
    >
      {tag}
    </span>
  );
};