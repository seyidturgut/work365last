import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFileUpload, FaUser, FaBuilding, FaShieldAlt, FaIdCard, FaCheckCircle, FaArrowLeft, FaArrowRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BelgeYukleme() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Başvuru sahibi
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    // Şirket
    companyName: "",
    companyType: "", // sahis/limited/anonim/bilanco
    taxNumber: "",
    tradeRegistryNo: "",
  });

  const [files, setFiles] = useState({
    // Kimlik ve yetki
    idCard: null, // Kimlik fotokopisi (ön/arka)
    residence: null, // İkametgâh belgesi (son 6 ay)
    powerOfAttorney: null, // Vekaletname (varsa)
    // Şirket belgeleri
    articlesOfAssociation: null, // Ana sözleşme / MERSİS çıktısı
    tradeRegistryGazette: null, // Ticaret Sicil Gazetesi
    taxCertificate: null, // Vergi levhası
    activityCertificate: null, // Faaliyet belgesi
    chamberRegistration: null, // Oda kayıt belgesi (opsiyonel)
    // Güvenlik ve uyum
    signatureCircular: null, // İmza sirküleri
    kvkkPolicy: null, // KVKK aydınlatma metni (opsiyonel)
  });

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  const handleFile = (key, file) => setFiles(prev => ({ ...prev, [key]: file }));

  const steps = [
    { id: 1, title: "Başvuru Sahibi", icon: <FaUser /> },
    { id: 2, title: "Şirket Bilgileri", icon: <FaBuilding /> },
    { id: 3, title: "Kimlik ve Yetki", icon: <FaIdCard /> },
    { id: 4, title: "Şirket Belgeleri", icon: <FaFileUpload /> },
    { id: 5, title: "Güvenlik ve Uyum", icon: <FaShieldAlt /> },
  ];

  const can1 = formData.applicantName && formData.applicantEmail && formData.applicantPhone;
  const can2 = formData.companyName && formData.companyType && formData.taxNumber;
  const can3 = files.idCard && files.residence; // powerOfAttorney opsiyonel
  const can4 = files.articlesOfAssociation && files.tradeRegistryGazette && files.taxCertificate; // activity/chamber opsiyonel
  const can5 = files.signatureCircular; // kvkkPolicy opsiyonel

  const onSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-20 px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-5xl text-green-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Belgeler Başarıyla Yüklendi</h2>
          <p className="text-gray-600 mb-8 text-lg">Dosyalarınız güvenli dijital arşive aktarıldı. İnceleme ardından bilgilendirileceksiniz.</p>
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200">
            <p className="text-sm text-gray-700"><span className="font-semibold">Referans:</span> BY-{Date.now().toString().slice(-8)}</p>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg">
            <FaHome /> Ana Sayfaya Dön
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-28 pb-12 bg-work-navy-500 text-white">
        <div className="container mx-auto px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">Belge Yükleme</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-blue-100 text-lg">Resmi belgelerinizi güvenle yükleyin. Desteklenen formatlar: PDF/JPG/PNG. Maks 5MB.</motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Stepper */}
          <div className="mb-8 relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
            <div className="absolute top-6 left-0 h-0.5 bg-primary z-0 transition-all" style={{ width: `${((step-1)/(steps.length-1))*100}%` }}></div>
            <div className="relative z-10 flex justify-between">
              {steps.map((s) => (
                <div key={s.id} className="text-center">
                  <button onClick={() => setStep(s.id)} className={`relative z-20 w-12 h-12 rounded-full flex items-center justify-center font-bold ring-4 ring-white ${step>=s.id? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border-2 border-gray-300'}`}>{step>s.id? <FaCheckCircle/>: s.id}</button>
                  <div className={`mt-2 text-xs font-medium ${step>=s.id? 'text-primary':'text-gray-400'}`}>{s.title}</div>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step===1 && (
              <motion.div key="s1" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-white border rounded-2xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaUser className="text-primary"/>Başvuru Sahibi Bilgileri</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {key:'applicantName', label:'Ad Soyad *'},
                    {key:'applicantEmail', label:'E-posta *', type:'email'},
                    {key:'applicantPhone', label:'Telefon *', numeric:true, maxLength:11},
                  ].map((f, i)=> (
                    <div key={f.key} className="relative min-h-[64px]">
                      <input className="peer w-full h-12 border rounded-xl px-4 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60"
                        placeholder=" " type={f.type||'text'} inputMode={f.numeric?'numeric':undefined} maxLength={f.maxLength}
                        value={formData[f.key]} onChange={(e)=>handleChange(f.key, f.numeric? e.target.value.replace(/\D/g,''): e.target.value)} />
                      <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">{f.label}</label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button onClick={()=>setStep(2)} disabled={!can1} className={`px-8 py-3 rounded-xl font-semibold ${can1? 'bg-primary text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Devam Et</button>
                </div>
              </motion.div>
            )}

            {step===2 && (
              <motion.div key="s2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-white border rounded-2xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaBuilding className="text-primary"/>Şirket Bilgileri</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {key:'companyName', label:'Şirket Adı *'},
                    {key:'companyType', label:'Şirket Türü *', options:['Şahıs','Limited','Anonim','Bilanço']},
                    {key:'taxNumber', label:'Vergi No / VKN *', numeric:true, maxLength:10},
                    {key:'tradeRegistryNo', label:'Ticaret Sicil No', numeric:true},
                  ].map((f,i)=> (
                    <div key={f.key} className="relative min-h-[64px]">
                      {f.options? (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                          <select className="w-full border rounded-xl px-4 py-3 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60"
                            value={formData[f.key]} onChange={(e)=>handleChange(f.key, e.target.value)}>
                            <option value="">Seçiniz</option>
                            {f.options.map(o=> <option key={o} value={o.toLowerCase()}>{o}</option>)}
                          </select>
                        </div>
                      ):(
                        <>
                          <input className="peer w-full h-12 border rounded-xl px-4 bg-gradient-to-r from-white to-blue-50/20 focus:outline-none focus:ring-2 focus:ring-primary/60" placeholder=" " type={f.type||'text'} inputMode={f.numeric?'numeric':undefined} maxLength={f.maxLength} value={formData[f.key]} onChange={(e)=>handleChange(f.key, f.numeric? e.target.value.replace(/\D/g,''): e.target.value)} />
                          <label className="pointer-events-none absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2">{f.label}</label>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={()=>setStep(1)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5 flex items-center gap-2"><FaArrowLeft/>Geri</button>
                  <button onClick={()=>setStep(3)} disabled={!can2} className={`px-8 py-3 rounded-xl font-semibold ${can2? 'bg-primary text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Devam Et</button>
                </div>
              </motion.div>
            )}

            {step===3 && (
              <motion.div key="s3" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-white border rounded-2xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaIdCard className="text-primary"/>Kimlik ve Yetki Belgeleri</h3>
                <div className="space-y-4">
                  {[
                    {key:'idCard', label:'Kimlik Fotokopisi (Ön/Arka) *', desc:'PDF/JPG/PNG, max 5MB'},
                    {key:'residence', label:'İkametgâh Belgesi *', desc:'Son 6 ay içinde alınmış'},
                    {key:'powerOfAttorney', label:'Vekaletname (Varsa)', desc:'Noter onaylı vekaletname'},
                  ].map((d)=> (
                    <div key={d.key} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors">
                      <label htmlFor={d.key} className="cursor-pointer block">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><FaFileUpload className="text-xl text-primary"/></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-gray-900">{d.label}</h4>{(d.key==='idCard'||d.key==='residence') && <span className="text-red-500 text-sm">*</span>}</div>
                            <p className="text-sm text-gray-600 mb-3">{d.desc}</p>
                            <input id={d.key} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e)=>handleFile(d.key, e.target.files[0])} />
                            {files[d.key]? (<div className="text-green-600 flex items-center gap-2"><FaCheckCircle/><span className="text-sm font-medium">{files[d.key].name}</span></div>) : (
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-200"><FaFileUpload/>Belge Yükle</div>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={()=>setStep(2)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5 flex items-center gap-2"><FaArrowLeft/>Geri</button>
                  <button onClick={()=>setStep(4)} disabled={!can3} className={`px-8 py-3 rounded-xl font-semibold ${can3? 'bg-primary text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Devam Et</button>
                </div>
              </motion.div>
            )}

            {step===4 && (
              <motion.div key="s4" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-white border rounded-2xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaFileUpload className="text-primary"/>Şirket Belgeleri</h3>
                <div className="space-y-4">
                  {[
                    {key:'articlesOfAssociation', label:'Ana Sözleşme / MERSİS Çıktısı *'},
                    {key:'tradeRegistryGazette', label:'Ticaret Sicil Gazetesi *'},
                    {key:'taxCertificate', label:'Vergi Levhası *'},
                    {key:'activityCertificate', label:'Faaliyet Belgesi (Opsiyonel)'},
                    {key:'chamberRegistration', label:'Oda Kayıt Belgesi (Opsiyonel)'},
                  ].map((d)=> (
                    <div key={d.key} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors">
                      <label htmlFor={d.key} className="cursor-pointer block">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><FaFileUpload className="text-xl text-primary"/></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-gray-900">{d.label}</h4>{(['articlesOfAssociation','tradeRegistryGazette','taxCertificate'].includes(d.key)) && <span className="text-red-500 text-sm">*</span>}</div>
                            <input id={d.key} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e)=>handleFile(d.key, e.target.files[0])} />
                            {files[d.key]? (<div className="text-green-600 flex items-center gap-2"><FaCheckCircle/><span className="text-sm font-medium">{files[d.key].name}</span></div>) : (
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-200"><FaFileUpload/>Belge Yükle</div>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={()=>setStep(3)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5 flex items-center gap-2"><FaArrowLeft/>Geri</button>
                  <button onClick={()=>setStep(5)} disabled={!can4} className={`px-8 py-3 rounded-xl font-semibold ${can4? 'bg-primary text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Devam Et</button>
                </div>
              </motion.div>
            )}

            {step===5 && (
              <motion.div key="s5" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="bg-white border rounded-2xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><FaShieldAlt className="text-primary"/>Güvenlik ve Uyum</h3>
                <div className="space-y-4">
                  {[
                    {key:'signatureCircular', label:'İmza Sirküleri *'},
                    {key:'kvkkPolicy', label:'KVKK Aydınlatma Metni (Opsiyonel)'},
                  ].map((d)=> (
                    <div key={d.key} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-primary transition-colors">
                      <label htmlFor={d.key} className="cursor-pointer block">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"><FaFileUpload className="text-xl text-primary"/></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1"><h4 className="font-semibold text-gray-900">{d.label}</h4>{d.key==='signatureCircular' && <span className="text-red-500 text-sm">*</span>}</div>
                            <input id={d.key} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e)=>handleFile(d.key, e.target.files[0])} />
                            {files[d.key]? (<div className="text-green-600 flex items-center gap-2"><FaCheckCircle/><span className="text-sm font-medium">{files[d.key].name}</span></div>) : (
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-200"><FaFileUpload/>Belge Yükle</div>
                            )}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-8">
                  <button onClick={()=>setStep(4)} className="px-8 py-3 rounded-xl font-semibold bg-white border text-primary hover:bg-primary/5 flex items-center gap-2"><FaArrowLeft/>Geri</button>
                  <button onClick={onSubmit} disabled={!can5} className={`px-8 py-3 rounded-xl font-semibold ${can5? 'bg-primary text-white':'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Yüklemeyi Tamamla</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

