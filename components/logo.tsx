import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className = "", onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="teguhcoding.com — Home"
      className={`inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 rounded-sm ${className}`}
    >
      <Image
        src="/logo.png"
        alt="teguhcoding.com"
        width={120}
        height={32}
        className="h-8 w-auto object-contain"
        priority
      />
    </Link>
  );
}
