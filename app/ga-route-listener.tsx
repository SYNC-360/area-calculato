'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GaRouteListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    // @ts-expect-error gtag is injected by the GA script
    window.gtag?.('config', GA_ID, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}
