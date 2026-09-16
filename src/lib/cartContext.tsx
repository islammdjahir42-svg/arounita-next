'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartState } from '@/types/woocommerce';
import { WCProduct } from '@/types/woocommerce';

interface CartContextType extends CartState {
  addItem: (product: WCProduct, qty?: number) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('arounita_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('arounita_cart', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product: WCProduct, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product_id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product_id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      const newItem: CartItem = {
        id: Date.now(),
        product_id: product.id,
        name: product.name,
        quantity: qty,
        price: parseFloat(product.sale_price || product.price),
        image: product.images?.[0]?.src || '',
        slug: product.slug,
      };
      return [...prev, newItem];
    });
  };

  const removeItem = (productId: number) => {
    setItems(prev => prev.filter(i => i.product_id !== productId));
  };

  const updateQty = (productId: number, qty: number) => {
    if (qty < 1) { removeItem(productId); return; }
    setItems(prev =>
      prev.map(i => i.product_id === productId ? { ...i, quantity: qty } : i)
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, count, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
