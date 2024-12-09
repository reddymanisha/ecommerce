'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/product';
import { Product } from '@/types/product';

export const dynamic = 'force-dynamic'; // Ensure the page is rendered dynamically

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts(); // Ensure this function is asynchronous
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      (product.type && product.type.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(results);
  }, [query, allProducts]);

  return (
    <ProductList products={searchResults} category={`Search Results for "${query}"`} />
  );
}
