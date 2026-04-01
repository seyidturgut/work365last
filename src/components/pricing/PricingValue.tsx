"use client";

type PricingValueProps = {
  currentPrice: string;
  crossedPrice?: string | null;
  suffix: string;
  meta?: string;
  className?: string;
  priceClassName?: string;
};

export default function PricingValue({
  currentPrice,
  crossedPrice,
  suffix,
  meta,
  className = "",
  priceClassName = "text-[46px]",
}: PricingValueProps) {
  const normalized = currentPrice.replace(/[^\d]/g, "");
  const showCurrency = normalized.length > 0;

  return (
    <div className={className}>
      <div className="min-h-[24px] text-[14px] text-[#94A3B8]">
        {crossedPrice ? <span className="line-through decoration-[1.5px]">{crossedPrice}</span> : "\u00A0"}
      </div>
      <div className="mt-1 flex flex-wrap items-end gap-2">
        {showCurrency ? <span className="text-[18px] font-bold text-[#0F172A]">₺</span> : null}
        <span className={`font-extrabold leading-none tracking-[-0.05em] text-[#0F172A] ${priceClassName}`}>
          {normalized.length > 0 ? normalized.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : currentPrice}
        </span>
        <span className="pb-1 text-[14px] text-[#64748B]">{suffix}</span>
      </div>
      {meta ? <p className="mt-2 text-[13px] text-[#64748B]">{meta}</p> : null}
    </div>
  );
}
