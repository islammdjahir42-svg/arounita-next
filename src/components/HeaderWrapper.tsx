'use client';

import { useCart } from '@/lib/cartContext';
import Header from './Header';
import { WCCategory } from '@/types/woocommerce';

export default function HeaderWrapper({ categories }: { categories: WCCategory[] }) {
  const { count } = useCart();
  return <Header categories={categories} cartCount={count} />;
}
