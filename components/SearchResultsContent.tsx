'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductList from '@/components/ProductList';
import { getAllProducts } from '@/lib/product';
import { Product } from '@/types/product';

export default function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
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
