'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { WCProduct, formatPrice, getDiscountPercent } from '@/lib/woocommerce';
import { useState } from 'react';

interface ProductCardProps {
  product: WCProduct;
  onAddToCart?: (product: WCProduct) => void;
}

function StarRating({ rating, count }: { rating: string; count: number }) {
  const stars = parseFloat(rating);
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(i => (
          <svg
            key={i}
            className={`w-3.5 h-3.5 ${i <= Math.round(stars) ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      {count > 0 && <span className="text-xs text-gray-400">({count})</span>}
    </div>
  );
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const isOutOfStock = product.stock_status === 'outofstock';
  const isOnSale = product.on_sale && product.sale_price;
  const discountPct = isOnSale
    ? getDiscountPercent(product.regular_price, product.sale_price)
    : 0;
  const isHot = product.featured || (product.rating_count > 5);
  const hasVariations = product.type === 'variable';

  const image =
    product.images?.[0]?.src || '/placeholder.png';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock || hasVariations) return;
    setAdding(true);
    onAddToCart?.(product);
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="product-card bg-white rounded-lg border border-gray-100 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {discountPct > 0 && (
              <span className="bg-[#FF6600] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                -{discountPct}%
              </span>
            )}
            {isHot && (
              <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                HOT
              </span>
            )}
          </div>

          {/* Sold Out overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded">
                SOLD OUT
              </span>
            </div>
          )}

          <Image
            src={image}
            alt={product.images?.[0]?.alt || product.name}
            fill
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="p-3">
          {/* Category */}
          {product.categories?.length > 0 && (
            <p className="text-xs text-gray-400 mb-1">
              {product.categories.map((c: { id: number; name: string; slug: string }) => c.name).join(', ')}
            </p>
          )}

          {/* Name */}
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="mb-2">
              <StarRating rating={product.average_rating} count={product.rating_count} />
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            {isOnSale ? (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.regular_price)}
                </span>
                <span className="text-base font-bold text-[#FF6600]">
                  {formatPrice(product.sale_price)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-[#FF6600]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || adding}
            className={`w-full py-2.5 rounded text-sm font-semibold transition-colors ${
              isOutOfStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : hasVariations
                ? 'bg-orange-50 text-[#FF6600] border border-[#FF6600] hover:bg-[#FF6600] hover:text-white'
                : adding
                ? 'bg-green-500 text-white'
                : 'bg-[#FF6600] text-white hover:bg-[#E65C00]'
            }`}
          >
            {isOutOfStock
              ? 'স্টক নেই'
              : hasVariations
              ? 'অপশন দেখুন'
              : adding
              ? '✓ যোগ হয়েছে'
              : (
                <span className="flex items-center justify-center gap-1">
                  <ShoppingCart size={14} />
                  কার্টে যোগ করুন
                </span>
              )
            }
          </button>
        </div>
      </div>
    </Link>
  );
}
