export default function Marquee() {
  const text = '✨ সুন্নাহার POWER — আলোর ভরসা — আমরা কী দিই? মানসম্পন্ন পণ্য, সাশ্রয়ী দাম, দ্রুত ডেলিভারি, ১০০% অরিজিনাল    ';
  const repeated = text.repeat(4);

  return (
    <div className="bg-[#FF6600] text-white py-2.5 overflow-hidden">
      <div className="marquee-track text-sm font-medium whitespace-nowrap">
        <span>{repeated}</span>
        <span aria-hidden>{repeated}</span>
      </div>
    </div>
  );
}
