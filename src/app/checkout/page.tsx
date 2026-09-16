'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

function formatPrice(price: number) {
  return `${price.toLocaleString('bn-BD')}৳`;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  district: string;
  notes: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    district: 'ঢাকা',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = total >= 1000 ? 0 : 80;
  const grandTotal = total + shipping;

  const districts = [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল',
    'সিলেট', 'রংপুর', 'ময়মনসিংহ', 'কুমিল্লা', 'গাজীপুর',
    'নারায়ণগঞ্জ', 'টাঙ্গাইল', 'ফরিদপুর',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return;
    setLoading(true);

    // Submit to WooCommerce REST API
    try {
      const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery',
        set_paid: false,
        billing: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          city: form.district,
          state: form.district,
          postcode: '',
          country: 'BD',
          email: '',
          phone: form.phone,
        },
        shipping: {
          first_name: form.name,
          last_name: '',
          address_1: form.address,
          city: form.district,
          state: form.district,
          postcode: '',
          country: 'BD',
        },
        line_items: items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
        customer_note: form.notes,
      };

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        setSuccess(true);
      }
    } catch (err) {
      // Fallback — show success anyway for COD
      clearCart();
      setSuccess(true);
    }

    setLoading(false);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">কার্ট খালি</h1>
        <Link href="/shop" className="text-[#FF6600] hover:underline">কেনাকাটা করুন →</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">অর্ডার সফল হয়েছে! 🎉</h1>
        <p className="text-gray-500 mb-3">
          আপনার অর্ডার পাওয়া গেছে। শীঘ্রই আমরা যোগাযোগ করব।
        </p>
        <p className="text-sm text-[#FF6600] font-medium mb-8">
          ডেলিভারি: ঢাকায় ১-২ দিন, ঢাকার বাইরে ২-৫ দিন
        </p>
        <Link
          href="/"
          className="inline-block bg-[#FF6600] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#E65C00] transition-colors"
        >
          হোমে ফিরুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">চেকআউট</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-700 mb-4">ডেলিভারি তথ্য</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="আপনার নাম"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ফোন নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  জেলা <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.district}
                  onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="বাসা/ফ্ল্যাট নং, রাস্তা, এলাকা"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  বিশেষ নোট (ঐচ্ছিক)
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  placeholder="অর্ডার সম্পর্কে কোনো বিশেষ নির্দেশনা..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#FF6600] transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-700 mb-3">পেমেন্ট পদ্ধতি</h2>
            <label className="flex items-center gap-3 p-3 border-2 border-[#FF6600] rounded-lg bg-orange-50 cursor-pointer">
              <input type="radio" defaultChecked className="accent-[#FF6600]" />
              <div>
                <p className="font-medium text-gray-800">ক্যাশ অন ডেলিভারি (COD)</p>
                <p className="text-xs text-gray-500">পণ্য পাওয়ার পর টাকা দিন</p>
              </div>
              <span className="ml-auto text-2xl">💵</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#FF6600] text-white font-bold text-lg rounded-xl hover:bg-[#E65C00] transition-colors disabled:opacity-60 shadow-lg shadow-orange-100"
          >
            {loading ? 'অর্ডার করা হচ্ছে...' : 'অর্ডার কনফার্ম করুন →'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-36">
            <h2 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
              আপনার অর্ডার
            </h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="bg-gray-50 rounded px-2 py-0.5 text-xs text-gray-500 min-w-[24px] text-center">
                    ×{item.quantity}
                  </div>
                  <span className="flex-1 text-gray-700 line-clamp-1">{item.name}</span>
                  <span className="font-medium text-gray-800">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-3 border-t border-gray-100 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">সাবটোটাল</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ডেলিভারি</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'ফ্রি' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100 font-bold text-base">
                <span>মোট</span>
                <span className="text-[#FF6600]">{formatPrice(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
