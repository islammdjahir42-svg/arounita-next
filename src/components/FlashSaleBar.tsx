import Image from 'next/image';
import Link from 'next/link';
import { WCProduct, formatPrice } from '@/lib/woocommerce';

interface FlashSaleBarProps {
  products: WCProduct[];
}

export default function FlashSaleBar({ products }: FlashSaleBarProps) {
  if (!products.length) return null;

  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flash-scroll gap-3">
          {products.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-3 py-2 min-w-[180px] hover:border-[#FF6600] hover:shadow-sm transition-all"
            >
              <div className="relative w-12 h-12 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                {product.images?.[0]?.src && (
                  <Image
                    src={product.images[0].src}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                    unoptimized
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-700 line-clamp-1 font-medium">{product.name}</p>
                {product.on_sale && product.regular_price && (
                  <p className="text-xs text-gray-400 line-through">
                    {formatPrice(product.regular_price)}
                  </p>
                )}
                <p className="text-sm font-bold text-[#FF6600]">
                  {formatPrice(product.sale_price || product.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
