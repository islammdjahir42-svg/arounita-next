import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import { WCCategory } from '@/types/woocommerce';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';

export const revalidate = 60;

interface ShopPageProps {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
    orderby?: string;
    featured?: string;
    sale?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = parseInt(searchParams.page || '1');
  const perPage = 16;

  let products: import('@/types/woocommerce').WCProduct[] = [];
  let categories: WCCategory[] = [];
  let activeCategory: WCCategory | null = null;

  try {
    [products, categories] = await Promise.all([
      getProducts({
        page,
        per_page: perPage,
        category: searchParams.category,
        search: searchParams.search,
        featured: searchParams.featured === 'true' ? true : undefined,
        orderby: searchParams.orderby || 'date',
        order: 'desc',
      }),
      getCategories(),
    ]);

    if (searchParams.category) {
      activeCategory = categories.find(c => String(c.id) === searchParams.category) || null;
    }
  } catch (e) {
    console.error('Shop fetch error:', e);
  }

  const buildUrl = (params: Record<string, string>) => {
    const sp = new URLSearchParams();
    if (searchParams.category) sp.set('category', searchParams.category);
    if (searchParams.search) sp.set('search', searchParams.search);
    Object.entries(params).forEach(([k, v]) => sp.set(k, v));
    return `/shop?${sp.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#FF6600]">হোম</Link>
        <span className="mx-2">/</span>
        {activeCategory ? (
          <>
            <Link href="/shop" className="hover:text-[#FF6600]">সব পণ্য</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{activeCategory.name}</span>
          </>
        ) : searchParams.search ? (
          <span className="text-gray-800">"{searchParams.search}" খোঁজার ফলাফল</span>
        ) : (
          <span className="text-gray-800 font-medium">সব পণ্য</span>
        )}
      </nav>

      <div className="flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden sticky top-36">
            <div className="bg-[#FF6600] text-white px-4 py-3 font-semibold text-sm">
              ক্যাটাগরি
            </div>
            <div className="py-2">
              <Link
                href="/shop"
                className={`block px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-[#FF6600] transition-colors ${
                  !searchParams.category ? 'text-[#FF6600] font-semibold bg-orange-50' : 'text-gray-700'
                }`}
              >
                সব পণ্য
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  className={`flex items-center justify-between px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-[#FF6600] transition-colors ${
                    searchParams.category === String(cat.id)
                      ? 'text-[#FF6600] font-semibold bg-orange-50'
                      : 'text-gray-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h1 className="text-lg font-bold text-gray-800">
              {activeCategory?.name ||
                (searchParams.search ? `"${searchParams.search}"` : 'সব পণ্য')}
              {products.length > 0 && (
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({products.length} পণ্য)
                </span>
              )}
            </h1>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-gray-400" />
              <SortSelect
                currentValue={searchParams.orderby || 'date'}
                category={searchParams.category}
                search={searchParams.search}
              />
            </div>
          </div>

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🔦</div>
              <p className="text-lg font-medium">কোনো পণ্য পাওয়া যায়নি</p>
              <Link href="/shop" className="mt-4 inline-block text-[#FF6600] hover:underline">
                সব পণ্য দেখুন
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {products.length === perPage && (
            <div className="flex justify-center gap-3 mt-10">
              {page > 1 && (
                <Link
                  href={buildUrl({ page: String(page - 1) })}
                  className="px-5 py-2.5 border border-gray-200 rounded-full text-sm hover:border-[#FF6600] hover:text-[#FF6600] transition-colors"
                >
                  ← আগের পাতা
                </Link>
              )}
              <Link
                href={buildUrl({ page: String(page + 1) })}
                className="px-5 py-2.5 bg-[#FF6600] text-white rounded-full text-sm hover:bg-[#E65C00] transition-colors"
              >
                পরের পাতা →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
