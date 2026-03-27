const oneTimeProducts = [
  { name: "Nitelikli e-İmza", price: "1.500 TL/yıl", desc: "Yasal geçerli dijital imza" },
  { name: "KEP Hesabı", price: "800 TL/yıl", desc: "Kayıtlı elektronik posta" },
  { name: "Marka Tescil", price: "Teklif bazlı", desc: "Türkpatent marka tescili" },
  { name: "Sanal Ofis", price: "1.200 TL/yıl", desc: "Yasal adres hizmeti" },
];

export default function TekSeferlikUrunler() {
  return (
    <section className="px-6 py-20 bg-[#F8FAFC]">
      <div className="max-w-[1230px] mx-auto">
        <h2 className="text-[28px] font-bold text-black mb-2">Tek Seferlik Ürünler</h2>
        <p className="text-[15px] text-black/50 mb-10">Şirket paketlerine ek olarak alınabilir.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {oneTimeProducts.map((p) => (
            <div key={p.name} className="rounded-[20px] bg-white border border-black/8 p-6">
              <h3 className="text-[16px] font-bold text-black mb-1">{p.name}</h3>
              <p className="text-[13px] text-black/50 mb-4">{p.desc}</p>
              <p className="text-[15px] font-bold text-black">{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
