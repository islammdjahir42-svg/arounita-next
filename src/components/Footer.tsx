import Link from 'next/link';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="text-2xl font-bold mb-3">
            <span className="text-[#FF6600]">সুন্নাহার</span>
            <span className="text-white"> Power</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            বাংলাদেশের সেরা ফ্ল্যাশলাইট ও পাওয়ার ব্যাংক শপ। মানসম্পন্ন পণ্য, দ্রুত ডেলিভারি, সর্বোচ্চ সন্তুষ্টি।
          </p>
          <div className="flex gap-3">
            <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors text-xs font-bold w-8 h-8 flex items-center justify-center">f</a>
            <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors text-xs font-bold w-8 h-8 flex items-center justify-center">▶</a>
            <a href="#" className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors w-8 h-8 flex items-center justify-center">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-[#FF6600] inline-block pr-4">
            দ্রুত লিংক
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/', label: 'হোম' },
              { href: '/shop', label: 'সব পণ্য' },
              { href: '/shop?featured=true', label: 'ফিচার পণ্য' },
              { href: '/shop?sale=true', label: 'অফার / ছাড়' },
              { href: '/contact', label: 'যোগাযোগ' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#FF6600] transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-[#FF6600] inline-block pr-4">
            পলিসি
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/refund-policy', label: 'রিটার্ন পলিসি' },
              { href: '/shipping-policy', label: 'ডেলিভারি পলিসি' },
              { href: '/privacy-policy', label: 'প্রাইভেসি পলিসি' },
              { href: '/terms', label: 'ব্যবহারের শর্ত' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#FF6600] transition-colors">
                  → {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-base mb-4 pb-2 border-b border-[#FF6600] inline-block pr-4">
            যোগাযোগ
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" />
              <span>01XXXXXXXXX (সকাল ৯টা - রাত ৯টা)</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={14} className="text-[#FF6600] mt-0.5 flex-shring-0" />
              <span>support@arounita.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-[#FF6600] mt-0.5 flex-shrink-0" />
              <span>ঢাকা, বাংলাদেশ</span>
            </li>
          </ul>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/880XXXXXXXXXX"
            className="mt-4 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700 transition-colors w-fit"
          >
            <MessageCircle size={14} />
            WhatsApp করুন
          </a>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 mb-2">পেমেন্ট পদ্ধতি</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {['bKash', 'Nagad', 'Rocket', 'COD'].map(method => (
              <span key={method} className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded">
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} সুন্নাহার Power. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
}
