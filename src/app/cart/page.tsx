'use client';

import { useCart } from '@/lib/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

function formatPrice(price: number) {
  return `${price.toLocaleString('bn-BD')}৳`;
}

export default function CartPage() {
  const { items, total, count, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">কার্ট খালি</h1>
        <p className="text-gray-400 mb-8">আপনার কার্টে কোনো পণ্য নেই।</p>
        <Link
          href="/shop"
          className="inline-block bg-[#FF6600] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#E65C00] transition-colors"
        >
          কেনাকাটা শুরু করুন →
        </Link>
      </div>
    );
  }

  const shipping = total >= 1000 ? 0 : 80;
  const grandTotal = total + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        আমার কার্ট ({count} পণ্য)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
              {/* Image */}
              <Link href={`/product/${item.slug}`} className="flex-shrink-0">
                <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-contain p-1" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🔦</div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="font-medium text-gray-800 hover:text-[#FF6600] line-clamp-2 text-sm">
                  {item.name}
                </Link>
                <p className="text-[#FF6600] font-bold mt-1">{formatPrice(item.price)}</p>

                {/* Qty + Delete */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQty(item.product_id, item.quantity - 1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-bold border-x border-gray-200 min-w-[36px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.product_id, item.quantity + 1)}
                      className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-800 text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-36">
            <h2 className="font-bold text-gray-800 text-lg mb-5 pb-3 border-b border-gray-100">
              অর্ডার সারসংক্ষেপ
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">সাবটোটাল</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ডেলিভারি চার্জ</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                  {shipping === 0 ? 'বিনামূল্যে' : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  ১,০০০৳ এর বেশি কিনলে ফ্রি ডেলিভারি
                </p>
              )}
              <div className="flex justify-between pt-3 border-t border-gray-100 text-base font-bold">
                <span>মোট</span>
                <span className="text-[#FF6600]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-[#FF6600] text-white rounded-xl font-semibold hover:bg-[#E65C00] transition-colors shadow-lg shadow-orange-100"
            >
              অর্ডার করুন →
            </Link>

            <Link
              href="/shop"
              className="mt-3 flex items-center justify-center w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
            >
              ← কেনাকাটা চালিয়ে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
