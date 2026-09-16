import { getProducts, getCategories } from '@/lib/woocommerce';
import HeroSlider from '@/components/HeroSlider';
import FlashSaleBar from '@/components/FlashSaleBar';
import ProductCard from '@/components/ProductCard';
import Marquee from '@/components/Marquee';
import CategorySection from '@/components/CategorySection';

export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: import('@/types/woocommerce').WCProduct[] = [];
  let allProducts: import('@/types/woocommerce').WCProduct[] = [];
  let saleProducts: import('@/types/woocommerce').WCProduct[] = [];
  let topProducts: import('@/types/woocommerce').WCProduct[] = [];
  let categories: import('@/types/woocommerce').WCCategory[] = [];

  try {
    [featuredProducts, allProducts, saleProducts, categories] = await Promise.all([
      getProducts({ featured: true, per_page: 8 }),
      getProducts({ per_page: 16, orderby: 'date', order: 'desc' }),
      getProducts({ per_page: 5, orderby: 'date', order: 'desc', on_sale: true } as never),
      getCategories(),
    ]);
    topProducts = allProducts.slice(0, 3);
  } catch (e) {
    console.error('API fetch failed:', e);
  }

  return (
    <>
      {/* Hero */}
      <HeroSlider />

      {/* Flash Sale Bar */}
      <FlashSaleBar products={saleProducts} />

      {/* Feature Products */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#FF6600] inline-block pr-4 uppercase tracking-wide">
            ফিচার পণ্য
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Marquee */}
      <Marquee />

      {/* All Products */}
      {allProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#FF6600] inline-block pr-4 uppercase tracking-wide">
            সব পণ্য
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/shop"
              className="inline-block border-2 border-[#FF6600] text-[#FF6600] px-8 py-3 rounded-full font-semibold hover:bg-[#FF6600] hover:text-white transition-all"
            >
              আরো পণ্য দেখুন →
            </a>
          </div>
        </section>
      )}

      {/* Top Sale */}
      {topProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-[#FF6600] inline-block pr-4 uppercase tracking-wide">
            টপ সেল
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Category Grid */}
      {categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      {/* Trust Badges */}
      <section className="bg-orange-50 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🚀', title: 'দ্রুত ডেলিভারি', sub: 'ঢাকায় ২৪ ঘণ্টা' },
              { icon: '✅', title: '১০০% অরিজিনাল', sub: 'নকল পণ্য নেই' },
              { icon: '🔄', title: 'রিটার্ন পলিসি', sub: '৭ দিন রিটার্ন' },
              { icon: '📞', title: '২৪/৭ সাপোর্ট', sub: 'সবসময় পাশে' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
