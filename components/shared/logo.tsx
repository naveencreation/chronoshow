import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <Link
      href="/"
      className={cn(
        'font-bold tracking-tight transition-opacity hover:opacity-80',
        sizes[size],
        className
      )}
    >
      {siteConfig.name}
    </Link>
  );
}
