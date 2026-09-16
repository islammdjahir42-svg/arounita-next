export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  categories: { id: number; name: string; slug: string }[];
  images: { id: number; src: string; alt: string }[];
  average_rating: string;
  rating_count: number;
  variations: number[];
  type: string;
  price_html: string;
  featured: boolean;
  tags: { id: number; name: string; slug: string }[];
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: { src: string; alt: string } | null;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  slug: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}
