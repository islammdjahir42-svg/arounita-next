import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const WC_URL = process.env.NEXT_PUBLIC_WC_URL || 'http://arounita.com';
    const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || '';
    const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || '';

    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
      return NextResponse.json({ error: 'WC credentials not configured' }, { status: 500 });
    }

    const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

    const res = await fetch(`${WC_URL}/wp-json/wc/v3/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }

    const order = await res.json();
    return NextResponse.json({ success: true, order_id: order.id, order_key: order.order_key });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
