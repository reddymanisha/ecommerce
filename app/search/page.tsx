'use client';

import { Suspense } from 'react';
import SearchResultsContent from '@/components/SearchResultsContent';

export const dynamic = 'force-dynamic'; // Mark page as dynamic

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
