export type { WCProduct, WCCategory } from '@/types/woocommerce';
import type { WCProduct, WCCategory } from '@/types/woocommerce';

const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'http://arounita.com';
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

function getAuthHeaders(): HeadersInit {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) return {};
  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  return { Authorization: `Basic ${credentials}` };
}

async function wcFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WC_URL}/wp-json/wc/v3/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  // Add credentials as query params (works with both HTTP and HTTPS)
  if (CONSUMER_KEY) url.searchParams.set('consumer_key', CONSUMER_KEY);
  if (CONSUMER_SECRET) url.searchParams.set('consumer_secret', CONSUMER_SECRET);
  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(),
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WC API error: ${res.status} ${endpoint}`);
  return res.json();
}

export async function getProducts(params?: {
  page?: number;
  per_page?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  orderby?: string;
  order?: string;
}): Promise<WCProduct[]> {
  const query: Record<string, string> = { per_page: '12' };
  if (params?.page) query.page = String(params.page);
  if (params?.per_page) query.per_page = String(params.per_page);
  if (params?.category) query.category = params.category;
  if (params?.search) query.search = params.search;
  if (params?.featured) query.featured = 'true';
  if (params?.orderby) query.orderby = params.orderby;
  if (params?.order) query.order = params.order;
  return wcFetch<WCProduct[]>('products', query);
}

export async function getProduct(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>('products', { slug });
  return products[0] || null;
}

export async function getCategories(): Promise<WCCategory[]> {
  return wcFetch<WCCategory[]>('products/categories', {
    per_page: '50',
    orderby: 'count',
    order: 'desc',
    hide_empty: 'true',
  });
}

export function formatPrice(price: string | number): string {
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return `${num.toLocaleString('bn-BD')}৳`;
}

export function getDiscountPercent(regular: string, sale: string): number {
  const r = parseFloat(regular);
  const s = parseFloat(sale);
  if (!r || !s || s >= r) return 0;
  return Math.round(((r - s) / r) * 100);
}
