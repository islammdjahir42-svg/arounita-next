'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, User, Phone, AlignJustify, X, ChevronRight } from 'lucide-react';
import { WCCategory } from '@/types/woocommerce';

interface HeaderProps {
  categories: WCCategory[];
  cartCount?: number;
  wishlistCount?: number;
}

export default function Header({ categories, cartCount = 0, wishlistCount = 0 }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#FFF0F0] py-1.5 text-center text-sm text-gray-600 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-end gap-6">
          <span className="flex items-center gap-1">
            <Phone size={13} className="text-primary-500" />
            <span>২৪/৭ সাপোর্ট</span>
          </span>
          <Link href="/contact" className="hover:text-[#FF6600] transition-colors">
            যোগাযোগ করুন
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`bg-white border-b border-gray-100 sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold leading-none">
                <span className="text-[#FF6600]">সুন্নাহার</span>
                <span className="text-gray-800 text-lg"> Power</span>
              </div>
              <div className="text-xs text-gray-400 -mt-0.5">আলোর ভরসা</div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                className="flex-1 border border-gray-200 rounded-l-full px-5 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#FF6600] text-white px-5 rounded-r-full hover:bg-[#E65C00] transition-colors"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Icons */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Link href="/account" className="flex flex-col items-center text-gray-600 hover:text-[#FF6600] transition-colors">
                <User size={20} />
                <span className="text-xs mt-0.5">অ্যাকাউন্ট</span>
              </Link>
              <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-[#FF6600] transition-colors relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6600] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-xs mt-0.5">পছন্দ</span>
              </Link>
              <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-[#FF6600] transition-colors relative">
                <div className="relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF6600] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-0.5">কার্ট</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center">
              {/* Category Button */}
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-2 bg-[#FF6600] text-white px-4 py-3 hover:bg-[#E65C00] transition-colors font-medium text-sm"
              >
                {showCategories ? <X size={16} /> : <AlignJustify size={16} />}
                <span>সকল ক্যাটাগরি</span>
              </button>

              {/* Nav Links */}
              <nav className="flex items-center ml-6 gap-6 text-sm font-medium">
                <Link href="/" className="text-[#FF6600] border-b-2 border-[#FF6600] py-3">হোম</Link>
                <Link href="/shop" className="text-gray-700 hover:text-[#FF6600] transition-colors py-3">সব পণ্য</Link>
                <Link href="/shop?featured=true" className="text-gray-700 hover:text-[#FF6600] transition-colors py-3">ফিচার পণ্য</Link>
                <Link href="/shop?sale=true" className="text-gray-700 hover:text-[#FF6600] transition-colors py-3">অফার</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Category Dropdown */}
      {showCategories && (
        <div className="fixed inset-0 z-40" onClick={() => setShowCategories(false)}>
          <div
            className="absolute top-0 left-0 bg-white shadow-xl w-72 max-h-screen overflow-y-auto z-50"
            style={{ top: '128px' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#FF6600] text-white px-4 py-3 font-semibold text-sm">
              সকল ক্যাটাগরি
            </div>
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.id}`}
                onClick={() => setShowCategories(false)}
                className="flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-orange-50 hover:text-[#FF6600] transition-colors text-sm text-gray-700"
              >
                <span>{cat.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">{cat.count}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Left Floating Category Button (mobile) */}
      <button
        onClick={() => setShowCategories(!showCategories)}
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[#FF6600] text-white p-2 rounded-r-lg z-40 shadow-lg md:hidden"
      >
        <AlignJustify size={18} />
      </button>
    </>
  );
}
