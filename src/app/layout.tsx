import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cartContext';
import { getCategories } from '@/lib/woocommerce';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'সুন্নাহার Power — অন্ধকারে ভরসার আলো',
  description: 'বাংলাদেশের সেরা ফ্ল্যাশলাইট, টর্চলাইট, ও পাওয়ার ব্যাংক শপ। মানসম্পন্ন পণ্য, দ্রুত ডেলিভারি।',
  keywords: 'flashlight, torch, power bank, ফ্ল্যাশলাইট, টর্চ, সুন্নাহার',
  openGraph: {
    title: 'সুন্নাহার Power',
    description: 'অন্ধকারে ভরসার আলো — Bangladesh best flashlight shop',
    url: 'https://arounita.com',
    siteName: 'সুন্নাহার Power',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: import('@/types/woocommerce').WCCategory[] = [];
  try {
    categories = await getCategories();
  } catch {
    // API not reachable during build — use empty
  }

  return (
    <html lang="bn">
      <body>
        <CartProvider>
          <HeaderWrapper categories={categories} />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
