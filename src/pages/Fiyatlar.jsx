import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { productsApi, faqApi } from "../lib/api";
import { useCart } from "../context/CartContext";
import { getToken } from "../lib/auth";

export default function Fiyatlar() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [ekOpen, setEkOpen] = useState({ plus: false, marka: false, vekalet: false });
  const [advOpen, setAdvOpen] = useState({ fiyat: false, esneklik: false, destek: false });
  const [faqOpen, setFaqOpen] = useState({});
  const [billing, setBilling] = useState("monthly"); // monthly | yearly
  const [companyType, setCompanyType] = useState("limited");
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testStep, setTestStep] = useState(0);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [faqData, setFaqData] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [faqError, setFaqError] = useState("");
  const [addingToCart, setAddingToCart] = useState(null);
  const [cartError, setCartError] = useState("");

  const handleStartApplication = async (selectedTier) => {
    const token = getToken();
    if (!token) {
      navigate(`/login?redirect=${encodeURIComponent('/fiyatlar')}`);
      return;
    }
    if (!currentProduct?.id) {
      setCartError("Ürün bilgisi bulunamadı.");
      return;
    }
    setAddingToCart(selectedTier);
    setCartError("");
    try {
      await addItem({
        product_id: currentProduct.id,
        tier: selectedTier,
        period: billing,
      });
      navigate('/odeme');
    } catch (err) {
      setCartError(err?.message || "Sepete eklenirken bir hata oluştu.");
    } finally {
      setAddingToCart(null);
    }
  };

  const toggleEk = (key) => setEkOpen((s) => ({ ...s, [key]: !s[key] }));
  const toggleAdv = (key) => setAdvOpen((s) => ({ ...s, [key]: !s[key] }));
  const toggleFaq = (key) => setFaqOpen((s) => ({ ...s, [key]: !s[key] }));

  useEffect(() => {
    (async () => {
      setLoading(true); setErr("");
      try {
        const res = await productsApi.list();
        const payload = res?.data ?? res;
        const normalized = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];
        setProducts(normalized);
      } catch (e) {
        setErr(e?.message || "Fiyatlar yüklenemedi");
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchFaq = async () => {
      setFaqLoading(true);
      setFaqError("");
      try {
        const res = await faqApi.list();
        const normalized = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
            ? res
            : [];
        if (!isMounted) return;
        setFaqData(normalized);
        if (normalized.length) {
          const initialState = {};
          normalized.forEach((category, catIdx) => {
            (category?.items || []).forEach((item, itemIdx) => {
              const key = item?.id ?? `${category.category || "cat"}-${itemIdx}`;
              initialState[key] = catIdx === 0 && itemIdx === 0;
            });
          });
          setFaqOpen(initialState);
        }
      } catch (e) {
        if (!isMounted) return;
        setFaqError(e?.message || "SSS yüklenirken bir hata oluştu.");
      } finally {
        if (isMounted) setFaqLoading(false);
      }
    };
    fetchFaq();
    return () => {
      isMounted = false;
    };
  }, []);

  const currentProduct = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    return list.find((p) => p?.key === companyType) || null;
  }, [products, companyType]);
  const standardPlans = useMemo(() => {
    const plans = currentProduct?.plans || [];
    const s = plans.filter(p => p.tier === 'standard');
    const m = s.find(p => p.period === 'monthly');
    const y = s.find(p => p.period === 'yearly');
    return { monthly: m || null, yearly: y || null };
  }, [currentProduct]);

  const advancedPlans = useMemo(() => {
    const plans = currentProduct?.plans || [];
    const a = plans.filter(p => p.tier === 'advanced');
    const m = a.find(p => p.period === 'monthly');
    const y = a.find(p => p.period === 'yearly');
    return { monthly: m || null, yearly: y || null };
  }, [currentProduct]);

  const standardFeatures = useMemo(() => {
    const features = currentProduct?.features || [];
    return features.filter(f => f.tier === 'standard');
  }, [currentProduct]);

  const advancedFeatures = useMemo(() => {
    const features = currentProduct?.features || [];
    return features.filter(f => f.tier === 'advanced');
  }, [currentProduct]);

  const fmt = (n) => {
    const num = typeof n === 'string' ? parseFloat(n) : n;
    if (!num && num !== 0) return '-';
    return num.toLocaleString('tr-TR');
  };

  const testQuestions = [
    {
      id: 'ciro',
      question: 'Yıllık ciro beklentiniz 1.200.000₺ üzerinde mi?',
      explanation: 'Yüksek cirolarda sermaye şirketinin vergisel avantajları vardır.',
    },
    {
      id: 'ortaklik',
      question: 'Şirketiniz için ortaklık kurma ya da hisse satışı planınız var mı?',
      explanation: 'Ortaklı işlemler ya da hisse satış işlemleri sermaye şirketlerinde mümkündür.',
    },
    {
      id: 'oda',
      question: 'Ticaret odası kaydı, oda sicil numarası veya oda sicil tasdiknamesi, ihale veya teşvik başvurusu planınız var mı?',
      explanation: 'Bazı ihale veya teşvik başvurularında ilgili kurumlarca yalnızca sermaye şirketlerine izin verilir.',
    },
    {
      id: 'ipo',
      question: 'Şirketinizi halka açmayı planlıyor musunuz?',
      explanation: 'Şirketi halka açmak(IPO) yalnızca Anonim şirketler için mümkündür.',
    },
    {
      id: 'banka',
      question: 'Bankacılık, aracı kurum, sigorta ya da faktoring alanlarında faaliyet gösterecek misiniz?',
      explanation: 'Bazı faaliyet alanları için Anonim şirket kurmak zorunludur.',
    },
    {
      id: 'ihale',
      question: 'Kamu ihalelerine katılmayı planlıyor musunuz?',
      explanation: 'Limited şirketlerin bazı ihalelere katılım kısıtı bulunmaktadır.',
    },
    {
      id: 'paydevri',
      question: 'Şirketinizin geleceğinde, pay devri veya ortaklık yapısındaki değişiklikler gibi bir planlama veya strateji düşünüyor musunuz?',
      explanation: 'Anonim şirketlerde pay devri limited şirketlere göre daha kolay ve daha az masraflıdır.',
    },
  ];

  const calculateTestResult = (answers) => {
    let scores = { sahis: 0, limited: 0, anonim: 0, bilanco: 0 };

    if (answers.ciro === 'yes') {
      scores.limited += 3;
      scores.anonim += 3;
    } else {
      scores.sahis += 2;
    }

    if (answers.ortaklik === 'yes') {
      scores.limited += 3;
      scores.anonim += 4;
    } else {
      scores.sahis += 2;
    }

    if (answers.oda === 'yes') {
      scores.limited += 2;
      scores.anonim += 3;
    }

    if (answers.ipo === 'yes') {
      scores.anonim += 10;
    } else {
      scores.limited += 2;
      scores.sahis += 1;
    }

    if (answers.banka === 'yes') {
      scores.anonim += 10;
    } else {
      scores.limited += 2;
      scores.sahis += 1;
    }

    if (answers.ihale === 'yes') {
      scores.anonim += 4;
      scores.limited -= 2;
    } else {
      scores.limited += 1;
    }

    if (answers.paydevri === 'yes') {
      scores.anonim += 4;
      scores.limited += 2;
    } else {
      scores.sahis += 1;
    }

    const maxScore = Math.max(...Object.values(scores));
    const recommended = Object.keys(scores).find(key => scores[key] === maxScore);

    const recommendations = {
      sahis: {
        name: 'Şahıs Şirketi',
        description: 'Küçük ölçekli işletmeler için ideal',
        features: ['Düşük kurulum maliyeti', 'Basit yönetim', 'Hızlı kurulum süreci', 'Bireysel sorumluluk'],
      },
      limited: {
        name: 'Limited Şirket',
        description: 'Orta ölçekli işletmeler için ideal',
        features: ['Esnek ortaklık yapısı', 'Kurumsal kimlik', 'Vergisel avantajlar', 'Kolay yönetim yapısı'],
      },
      anonim: {
        name: 'Anonim Şirket',
        description: 'Büyük ölçekli işletmeler ve özel sektör projeleri için',
        features: ['Halka açılma imkanı', 'Pay devri kolaylığı', 'Yüksek güven', 'Geniş ortaklık yapısı'],
      },
      bilanco: {
        name: 'Bilanço Şirketi',
        description: 'Yüksek ciro ve özel durumlar için',
        features: ['Gelişmiş yapı', 'Kurumsal avantajlar', 'Profesyonel yönetim', 'Yüksek kredibilite'],
      },
    };

    return recommendations[recommended];
  };

  const handleTestAnswer = (answer) => {
    const currentQ = testQuestions[testStep];
    setTestAnswers({ ...testAnswers, [currentQ.id]: answer });

    if (testStep < testQuestions.length - 1) {
      setTestStep(testStep + 1);
    } else {
      const result = calculateTestResult({ ...testAnswers, [currentQ.id]: answer });
      setTestResult(result);
    }
  };

  const resetTest = () => {
    setTestStep(0);
    setTestAnswers({});
    setTestResult(null);
  };

  return (
    <div className="bg-white">
      <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight !text-white">
              Şirketiniz için ihtiyacınız olan her şey
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              En avantajlı fiyatlarla tek bir yerde.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-blue-50/40">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Şirket Türü Seçimi */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Şirket Türü:</h3>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: 'sahis', label: 'Şahıs Şirketi' },
                  { key: 'limited', label: 'Limited Şirket' },
                  { key: 'anonim', label: 'Anonim Şirket' },
                  { key: 'bilanco', label: 'Bilanço Şirketi' },
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setCompanyType(type.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${companyType === type.key
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 border hover:bg-primary/10'
                      }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  resetTest();
                  setTestModalOpen(true);
                }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                💡 Size Uygun Şirket Türünü Bulun
              </button>
            </div>
          </div>

          {/* Dönem Toggle */}
          <div className="flex items-center justify-center mb-8">
            <div className="inline-flex items-center bg-white border rounded-full p-1 shadow-sm">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billing === 'monthly' ? 'bg-primary text-white shadow' : 'text-text'}`}
              >
                Aylık
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billing === 'yearly' ? 'bg-primary text-white shadow' : 'text-text'}`}
              >
                Yıllık
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.005 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border ring-1 ring-primary/10 hover:ring-primary/30 shadow-md hover:shadow-2xl p-8 flex flex-col transition-all duration-300"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mt-1">Ticaret-e Başla</h3>
              </div>
              <div className="text-3xl font-extrabold mb-6">
                {billing === 'monthly' ? (
                  <>
                    ₺{fmt(standardPlans.monthly?.net_price)}/ay <span className="text-base font-semibold text-text-light align-middle">+ KDV</span>
                  </>
                ) : (
                  <>
                    ₺{fmt(standardPlans.yearly?.net_price)}/yıl <span className="text-base font-semibold text-text-light align-middle">+ KDV</span>
                  </>
                )}
              </div>
              <ul className="space-y-3 text-text-light flex-1">
                {standardFeatures.map((f, i) => (
                  <li key={i} className={f.included ? '' : 'opacity-60'}>{f.name}</li>
                ))}
              </ul>
              <button
                onClick={() => handleStartApplication('standard')}
                disabled={addingToCart === 'standard'}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 w-full"
              >
                {addingToCart === 'standard' ? 'Ekleniyor...' : 'Başvuruya Başla'}
              </button>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-gradient-to-br from-white to-indigo-50 rounded-2xl border-2 border-primary/60 ring-2 ring-primary/10 hover:ring-primary/30 shadow-lg hover:shadow-2xl p-8 flex flex-col"
            >
              <span className="absolute -top-3 right-6 px-3 py-1 text-xs bg-primary text-white rounded-full animate-pulse">En Çok Tercih Edilen</span>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mt-1">Plus</h3>
              </div>
              <div className="text-3xl font-extrabold mb-6">
                {billing === 'monthly' ? (
                  <>
                    ₺{fmt(advancedPlans.monthly?.net_price)}/ay <span className="text-base font-semibold text-text-light align-middle">+ KDV</span>
                  </>
                ) : (
                  <>
                    ₺{fmt(advancedPlans.yearly?.net_price)}/yıl <span className="text-base font-semibold text-text-light align-middle">+ KDV</span>
                  </>
                )}
              </div>
              <ul className="space-y-3 text-text-light flex-1">
                {advancedFeatures.map((f, i) => (
                  <li key={i} className={f.included ? '' : 'opacity-60'}>{f.name}</li>
                ))}
              </ul>
              <button
                onClick={() => handleStartApplication('advanced')}
                disabled={addingToCart === 'advanced'}
                className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 w-full"
              >
                {addingToCart === 'advanced' ? 'Ekleniyor...' : 'Başvuruya Başla'}
              </button>
              <div className="mt-3 text-xs text-text-light">Yıllık paketlerde vade farksız 3 taksit</div>
            </motion.div>

            <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }} animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }} className="bg-white rounded-2xl border shadow-sm p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary mt-1">Enterprise</h3>
              </div>
              <div className="text-lg font-semibold text-text mb-6">Özelleştirilmiş Plan</div>
              <p className="text-text-light mb-6">Daha kapsamlı, size özel bir plan için ekibimizle görüşün.</p>
              <Link to="/iletisim" className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-white text-primary border border-primary rounded-xl font-semibold hover:bg-primary/5 transition-colors">
                Randevu Planlayın
              </Link>
            </motion.div>
          </div>

          {cartError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center"
            >
              {cartError}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-blue-50/40 to-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ek Hizmetler</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-xl transition-shadow"
            >
              <button onClick={() => toggleEk('plus')} className="w-full text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Work365 Plus</h3>
                  <motion.span animate={{ rotate: ekOpen.plus ? 180 : 0 }} className="text-text">⌄</motion.span>
                </div>
                <p className="text-text-light mt-2">Ön muhasebe operasyonunuzu devredin, işinizi büyütmeye odaklanın.</p>
              </button>
              <AnimatePresence initial={false}>
                {ekOpen.plus && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 text-sm text-text-light">
                      <li>Fatura düzenleme ve ödeme takibi</li>
                      <li>Gelir-gider eşleştirme</li>
                      <li>Raporlama ve bildirimler</li>
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Link to="#" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Satın Al</Link>
                      <Link to="#" className="px-4 py-2 bg-white text-primary border border-primary rounded-lg text-sm">İncele</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-xl transition-shadow"
            >
              <button onClick={() => toggleEk('marka')} className="w-full text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Marka Tescil</h3>
                  <motion.span animate={{ rotate: ekOpen.marka ? 180 : 0 }} className="text-text">⌄</motion.span>
                </div>
                <p className="text-text-light mt-2">Ücretsiz marka araştırması ve tescil süreçleri.</p>
              </button>
              <AnimatePresence initial={false}>
                {ekOpen.marka && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 text-sm text-text-light">
                      <li>Benzer marka analizi</li>
                      <li>Sınıf seçimi danışmanlığı</li>
                      <li>Başvuru ve takip</li>
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Link to="#" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Hemen Başla</Link>
                      <Link to="#" className="px-4 py-2 bg-white text-primary border border-primary rounded-lg text-sm">Detaylı İncele</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-gradient-to-br from-white to-blue-50 shadow-sm hover:shadow-xl transition-shadow"
            >
              <button onClick={() => toggleEk('vekalet')} className="w-full text-left">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Vekalet Hizmeti</h3>
                  <motion.span animate={{ rotate: ekOpen.vekalet ? 180 : 0 }} className="text-text">⌄</motion.span>
                </div>
                <p className="text-text-light mt-2">Vergi dairesi yoklama işlemlerini sizin adınıza tamamlayalım.</p>
              </button>
              <AnimatePresence initial={false}>
                {ekOpen.vekalet && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2 text-sm text-text-light">
                      <li>Vekaletname hazırlanması</li>
                      <li>Randevu ve saha süreç yönetimi</li>
                      <li>Durum bilgilendirmeleri</li>
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Link to="#" className="px-4 py-2 bg-primary text-white rounded-lg text-sm">Hemen Başla</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avantajlar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleAdv('fiyat')}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-text">Uygun Fiyatlandırma</h4>
                <motion.span animate={{ rotate: advOpen.fiyat ? 180 : 0 }} className="text-text">⌄</motion.span>
              </div>
              <p className="text-text-light mt-2">Asgari tarifelere paralel, mümkün olan en uygun seviyede.</p>
              <AnimatePresence initial={false}>
                {advOpen.fiyat && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <ul className="mt-3 pl-4 list-disc text-sm text-text-light space-y-1">
                      <li>Şeffaf paket içerikleri</li>
                      <li>Yıllık alımlarda taksit imkanı</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleAdv('esneklik')}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-text">Esneklik</h4>
                <motion.span animate={{ rotate: advOpen.esneklik ? 180 : 0 }} className="text-text">⌄</motion.span>
              </div>
              <p className="text-text-light mt-2">Planlar ve abonelik periyotları arasında kolay geçiş.</p>
              <AnimatePresence initial={false}>
                {advOpen.esneklik && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <ul className="mt-3 pl-4 list-disc text-sm text-text-light space-y-1">
                      <li>Plan yükseltme/düşürme</li>
                      <li>Şirket türü değişikliğinde destek</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border bg-white cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleAdv('destek')}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-text">Destek</h4>
                <motion.span animate={{ rotate: advOpen.destek ? 180 : 0 }} className="text-text">⌄</motion.span>
              </div>
              <p className="text-text-light mt-2">Hafta içi 09:00–18:00 arasında telefon ve e‑posta desteği.</p>
              <AnimatePresence initial={false}>
                {advOpen.destek && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <ul className="mt-3 pl-4 list-disc text-sm text-text-light space-y-1">
                      <li>Özel müşteri temsilcisi</li>
                      <li>Hızlı e‑posta dönüşleri</li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-primary font-semibold uppercase tracking-[0.35em] text-xs mb-2">Faq</p>
              <h2 className="text-2xl font-bold text-primary">Sıkça Sorulan Sorular</h2>
            </div>
            {faqLoading && (
              <span className="text-sm text-text-light animate-pulse">Yükleniyor...</span>
            )}
            {faqError && (
              <span className="text-sm text-red-500">{faqError}</span>
            )}
          </div>

          {!faqLoading && !faqData.length && !faqError && (
            <div className="rounded-2xl border bg-white p-6 text-center text-text-light">
              Henüz SSS verisi bulunamadı.
            </div>
          )}

          <div className="space-y-10">
            {faqData.map((category, categoryIndex) => (
              <div key={category?.category || `category-${categoryIndex}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-text">
                    {category?.category || "Genel"}
                  </h3>
                  <span className="text-sm text-text-light">
                    {(category?.items || []).length} soru
                  </span>
                </div>
                <div className="divide-y rounded-2xl border bg-white">
                  {(category?.items || []).map((item, itemIndex) => {
                    const key = item?.id ?? `${category?.category || "cat"}-${itemIndex}`;
                    const isOpen = !!faqOpen[key];
                    return (
                      <div className="p-6" key={key}>
                        <button
                          onClick={() => toggleFaq(key)}
                          className="w-full text-left font-semibold text-text flex items-center justify-between"
                        >
                          <span>{item?.question || "Soru"}</span>
                          <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>⌄</motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 text-text-light overflow-hidden"
                            >
                              {item?.answer || "Cevap bilgisi yakında eklenecek."}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                  {!category?.items?.length && (
                    <div className="p-6 text-sm text-text-light">
                      Bu kategoride soru bulunmamaktadır.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Modal */}
      <AnimatePresence>
        {testModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setTestModalOpen(false);
                setTimeout(() => resetTest(), 300);
              }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
              >
                <button
                  onClick={() => {
                    setTestModalOpen(false);
                    setTimeout(() => resetTest(), 300);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
                >
                  ×
                </button>

                <div className="p-8">
                  {!testResult ? (
                    <>
                      <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hangi Şirket Türünü Seçmeliyim?</h2>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((testStep + 1) / testQuestions.length) * 100}%` }}
                            className="h-full bg-gradient-to-r from-primary to-blue-600"
                          />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Soru {testStep + 1} / {testQuestions.length}
                        </p>
                      </div>

                      <motion.div
                        key={testStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="mb-6"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {testQuestions[testStep].question}
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
                          {testQuestions[testStep].explanation}
                        </p>

                        <div className="flex gap-4">
                          <button
                            onClick={() => handleTestAnswer('yes')}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                          >
                            Evet
                          </button>
                          <button
                            onClick={() => handleTestAnswer('no')}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                          >
                            Hayır
                          </button>
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center"
                      >
                        <span className="text-4xl">✓</span>
                      </motion.div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Cevaplarınıza uygun önerimiz
                      </h3>
                      <h4 className="text-3xl font-extrabold text-primary mb-4">
                        "{testResult.name}"
                      </h4>
                      <p className="text-gray-600 mb-6">{testResult.description}</p>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
                        <h5 className="font-semibold text-gray-900 mb-3">Avantajları:</h5>
                        <ul className="space-y-2 text-left">
                          {testResult.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700">
                              <span className="text-primary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                        <p className="text-xs text-yellow-800 text-center">
                          Bu test sonuçları yalnızca bilgilendirme amaçlıdır ve yasal tavsiye niteliği taşımaz.
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            const recommendations = {
                              'Şahıs Şirketi': 'sahis',
                              'Limited Şirket': 'limited',
                              'Anonim Şirket': 'anonim',
                              'Bilanço Şirketi': 'bilanco',
                            };
                            const recommendedKey = recommendations[testResult.name];
                            if (recommendedKey) setCompanyType(recommendedKey);
                            setTestModalOpen(false);
                            setTimeout(() => resetTest(), 300);
                          }}
                          className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-md"
                        >
                          Bu Türü Seç
                        </button>
                        <button
                          onClick={() => {
                            resetTest();
                          }}
                          className="flex-1 px-6 py-3 bg-white border border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all"
                        >
                          Testi Tekrarla
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


