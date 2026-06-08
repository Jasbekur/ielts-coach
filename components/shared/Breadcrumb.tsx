import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href:  string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Visual breadcrumb nav — BreadcrumbList JSON-LD is handled separately
 * by <BreadcrumbSchema> in components/shared/StructuredData.tsx.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: "Home", href: "/" },
 *     { label: "Blog", href: "/blog" },
 *     { label: "Post title", href: "/blog/slug" },
 *   ]} />
 */
export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-1 text-sm flex-wrap ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.href} className="flex items-center gap-1 min-w-0">
            {/* Separator — skip before first item */}
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            )}

            {/* Home icon on first item */}
            {index === 0 && (
              <Home className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mr-0.5" />
            )}

            {isLast ? (
              /* Last item — not a link, truncated on small screens */
              <span
                className="text-gray-500 truncate max-w-[160px] sm:max-w-xs"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              /* Ancestor — clickable link */
              <Link
                href={item.href}
                className="text-gray-500 hover:text-red-600 transition-colors duration-150 whitespace-nowrap"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
