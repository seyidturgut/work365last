const stats = [
  { value: "24 saat", label: "içinde kuruluş tamamlanır" },
  { value: "7/24", label: "dijital asistan desteği" },
  { value: "%35+", label: "yıllık pakette tasarruf" },
  { value: "2.400+", label: "belge yılda otomatik işlenir" },
];

export default function Stats() {
  return (
    <section className="px-6 py-20 max-w-[1230px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[20px] bg-[#F8FAFC] border border-black/6 p-7 text-center">
            <p className="text-[32px] font-bold text-black tracking-tight mb-1">{stat.value}</p>
            <p className="text-[13px] text-black/50 leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
