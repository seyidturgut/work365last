"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

function FaqItemCard({ question, answer, accent }: FaqItem & { accent: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group rounded-[26px] bg-white px-7 py-6 shadow-sm ring-1 ring-black/6 transition-all duration-300 hover:shadow-md"
      style={{ borderLeft: open ? `3px solid ${accent}` : "3px solid transparent" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="pr-4 text-[17px] font-bold text-black">{question}</span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-black/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pt-4 text-[15px] leading-8 text-black/68">{answer}</p>
      </div>
    </div>
  );
}

export function FaqAccordion({ items, accent }: { items: readonly FaqItem[]; accent: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {items.map((item) => (
        <FaqItemCard
          key={item.question}
          question={item.question}
          answer={item.answer}
          accent={accent}
        />
      ))}
    </div>
  );
}
