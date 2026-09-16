'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { WCProduct } from '@/types/woocommerce';

interface AddToCartButtonProps {
  product: WCProduct;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock_status === 'outofstock';
  const hasVariations = product.type === 'variable';

  const handleAdd = () => {
    if (isOutOfStock) return;
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (hasVariations) {
    return (
      <a
        href={product.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#FF6600] text-white rounded-xl font-semibold text-base hover:bg-[#E65C00] transition-colors"
      >
        <ShoppingCart size={18} />
        অপশন বেছে নিন
      </a>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">পরিমাণ:</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty(prev => Math.max(1, prev - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="px-4 py-2 text-sm font-bold min-w-[40px] text-center border-x border-gray-200">
            {qty}
          </span>
          <button
            onClick={() => setQty(prev => prev + 1)}
            className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={isOutOfStock}
        className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
          isOutOfStock
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : added
            ? 'bg-green-500 text-white'
            : 'bg-[#FF6600] text-white hover:bg-[#E65C00] shadow-lg shadow-orange-200 hover:shadow-orange-300'
        }`}
      >
        <ShoppingCart size={18} />
        {isOutOfStock ? 'স্টক নেই' : added ? '✓ কার্টে যোগ হয়েছে!' : 'কার্টে যোগ করুন'}
      </button>

      {/* Buy Now */}
      {!isOutOfStock && (
        <a
          href="/checkout"
          onClick={() => addItem(product, qty)}
          className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#FF6600] text-[#FF6600] rounded-xl font-semibold text-base hover:bg-orange-50 transition-colors"
        >
          এখনই কিনুন
        </a>
      )}
    </div>
  );
}
