'use client';

interface SortSelectProps {
  currentValue: string;
  category?: string;
  search?: string;
}

const sortOptions = [
  { value: 'date', label: 'নতুন পণ্য আগে' },
  { value: 'price', label: 'কম দাম আগে' },
  { value: 'price-desc', label: 'বেশি দাম আগে' },
  { value: 'popularity', label: 'জনপ্রিয়' },
  { value: 'rating', label: 'রেটিং' },
];

export default function SortSelect({ currentValue, category, search }: SortSelectProps) {
  const buildUrl = (orderby: string) => {
    const sp = new URLSearchParams();
    if (category) sp.set('category', category);
    if (search) sp.set('search', search);
    sp.set('orderby', orderby);
    return `/shop?${sp.toString()}`;
  };

  return (
    <select
      className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF6600]"
      defaultValue={currentValue}
      onChange={e => {
        window.location.href = buildUrl(e.target.value);
      }}
    >
      {sortOptions.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
