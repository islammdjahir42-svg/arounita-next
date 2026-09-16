import Link from 'next/link';
import { WCCategory } from '@/types/woocommerce';

interface CategorySectionProps {
  categories: WCCategory[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#FF6600] inline-block pr-4 uppercase tracking-wide">
        ক্যাটাগরি
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories.slice(0, 12).map(cat => (
          <Link
            key={cat.id}
            href={`/shop?category=${cat.id}`}
            className="bg-white border border-gray-100 rounded-xl p-4 text-center hover:border-[#FF6600] hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-[#FF6600] transition-colors">
              <span className="text-lg">🔦</span>
            </div>
            <p className="text-xs font-medium text-gray-700 group-hover:text-[#FF6600] transition-colors uppercase">
              {cat.name}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{cat.count} পণ্য</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
