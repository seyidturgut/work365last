import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { companyRegistrationApi, productsApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { getPhoneDigits } from "../lib/phoneUtils";
import { isAtLeast18YearsOld } from "../utils/companyRegistrationUtils";
import { useCompanyRegistrationForm } from "../hooks/company-registration/useCompanyRegistrationForm";
import { useAddresses } from "../hooks/company-registration/useAddresses";
import { useLocations } from "../hooks/company-registration/useLocations";
import CompanyRegistrationHeader from "../components/company-registration/CompanyRegistrationHeader";
import PersonalInfoStep from "../components/company-registration/steps/PersonalInfoStep";
import ContactInfoStep from "../components/company-registration/steps/ContactInfoStep";
import CompanyInfoStep from "../components/company-registration/steps/CompanyInfoStep";
import PartnersStep from "../components/company-registration/steps/PartnersStep";
import WorkplaceInfoStep from "../components/company-registration/steps/WorkplaceInfoStep";
import DocumentsStep from "../components/company-registration/steps/DocumentsStep";
import { motion } from "framer-motion";
import { formatPhoneNumber } from "../lib/phoneUtils";

export default function SirketKurulusu() {
  const navigate = useNavigate();
  const [sp] = useSearchParams();

  const [accessChecking, setAccessChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [canCreateNew, setCanCreateNew] = useState(false);
  const [accessMessage, setAccessMessage] = useState("");
  const [existingRegistrationId, setExistingRegistrationId] = useState(null);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countdownRef = useRef(null);

  const {
    formData,
    setFormData,
    step,
    setStep,
    companyType,
    setCompanyType,
    tier,
    period,
    submitting,
    setSubmitting,
    error,
    setError,
    preselectedFromQuery,
    handleInputChange,
    handlePartnerChange,
    addPartner,
    removePartner,
    handleFileUpload,
  } = useCompanyRegistrationForm();

  const { addresses, selectedAddressId, loadingAddresses, handleAddressSelect } = useAddresses(formData, setFormData);

  const { cities, districts, workplaceDistricts, loadingLocations, loadDistricts } = useLocations();

  useEffect(() => {
    const checkAccess = async () => {
      const token = getToken();
      if (!token) {
        setAccessChecking(false);
        return;
      }

      const ct = sp.get('companyType');
      const t = sp.get('tier');
      const p = sp.get('period');

      if (!ct || !t || !p) {
        setAccessMessage("Geçersiz form linki. Lütfen e-postanızdaki bağlantıyı kullanın.");
        setAccessChecking(false);
        return;
      }

      try {
        const res = await companyRegistrationApi.checkAccess(token, {
          companyType: ct,
          tier: t,
          period: p,
        });

        if (!res.has_access) {
          setAccessMessage(res.message || "Bu şirket türü için ödeme yapılmamış. Lütfen önce ödeme yapınız.");
        } else if (res.can_create_new) {
          setHasAccess(true);
          setCanCreateNew(true);
        } else {
          const regStatus = res.existing_registration_status;

          if (regStatus === 'submitted' || regStatus === 'approved') {
            setAccessMessage("Başvurunuz zaten gönderilmiş. Tekrar doldurmak için yeni satın alma yapmanız gerekmektedir.");
          } else if (res.existing_registration_id) {
            setHasAccess(true);
            setCanCreateNew(false);
            setExistingRegistrationId(res.existing_registration_id);
            try {
              const reg = await companyRegistrationApi.get(token, res.existing_registration_id);
              const data = reg?.data || reg;
              if (data) {
                setFormData(prev => ({
                  ...prev,
                  firstName: data.first_name || data.personal_info?.firstName || prev.firstName,
                  lastName: data.last_name || data.personal_info?.lastName || prev.lastName,
                  tcKimlikNo: data.tc_kimlik_no || data.personal_info?.tcKimlikNo || prev.tcKimlikNo,
                  birthDate: data.birth_date || data.personal_info?.birthDate || prev.birthDate,
                  birthPlace: data.birth_place || data.personal_info?.birthPlace || prev.birthPlace,
                  maritalStatus: data.marital_status || data.personal_info?.maritalStatus || prev.maritalStatus,
                  motherName: data.mother_name || data.personal_info?.motherName || prev.motherName,
                  fatherName: data.father_name || data.personal_info?.fatherName || prev.fatherName,
                  email: data.email || data.contact_info?.email || prev.email,
                  phone: data.phone ? formatPhoneNumber(data.phone) : (data.contact_info?.phone ? formatPhoneNumber(data.contact_info.phone) : prev.phone),
                  mobile: data.mobile ? formatPhoneNumber(data.mobile) : prev.mobile,
                  address: data.address || data.contact_info?.address || prev.address,
                  city: data.city || data.contact_info?.city || prev.city,
                  district: data.district || data.contact_info?.district || prev.district,
                  postalCode: data.postal_code || data.contact_info?.postal_code || prev.postalCode,
                  companyName: data.company_name || data.company_info?.companyName || prev.companyName,
                  companyActivity: data.company_activity || data.company_info?.companyActivity || prev.companyActivity,
                  capital: data.capital || data.company_info?.capital || prev.capital,
                  partnerCount: data.partner_count || data.company_info?.partnerCount || prev.partnerCount,
                  partners: (data.partners && data.partners.length > 0)
                    ? data.partners.map(p => ({
                      name: p.name || "",
                      tcKimlikNo: p.tc_kimlik_no || p.tcKimlikNo || "",
                      share: p.share || "",
                      address: p.address || "",
                    }))
                    : prev.partners,
                  workplaceAddress: data.workplace_address || data.workplace_info?.workplaceAddress || prev.workplaceAddress,
                  workplaceCity: data.workplace_city || data.workplace_info?.workplaceCity || prev.workplaceCity,
                  workplaceDistrict: data.workplace_district || data.workplace_info?.workplaceDistrict || prev.workplaceDistrict,
                  workplaceType: data.workplace_type || data.workplace_info?.workplaceType || prev.workplaceType,
                }));
              }
            } catch (loadErr) {
              console.error("Mevcut kayıt yüklenemedi:", loadErr);
            }
          } else {
            setAccessMessage("Beklenmeyen bir durum oluştu. Lütfen destek ile iletişime geçin.");
          }
        }
      } catch (err) {
        if (err?.status === 422) {
          setAccessMessage("Geçersiz parametreler. Lütfen e-postanızdaki bağlantıyı kullanın.");
        } else if (err?.status === 401) {
          setAccessMessage("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
        } else {
          setAccessMessage(err?.message || "Erişim kontrolü sırasında bir hata oluştu.");
        }
      }
      setAccessChecking(false);
    };

    checkAccess();
  }, [sp]);

  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!cities.length) return;
    if (formData.cityId) {
      loadDistricts(formData.cityId, "main", formData, setFormData);
    } else if (formData.city) {
      const match = cities.find(
        (c) => c.name?.toLowerCase() === formData.city.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, cityId: match.id }));
        loadDistricts(match.id, "main", formData, setFormData);
      }
    }
  }, [cities, formData.city, formData.cityId]);

  useEffect(() => {
    if (!cities.length) return;
    if (formData.workplaceCityId) {
      loadDistricts(formData.workplaceCityId, "workplace", formData, setFormData);
    } else if (formData.workplaceCity) {
      const match = cities.find(
        (c) => c.name?.toLowerCase() === formData.workplaceCity.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, workplaceCityId: match.id }));
        loadDistricts(match.id, "workplace", formData, setFormData);
      }
    }
  }, [cities, formData.workplaceCity, formData.workplaceCityId]);

  const handleCitySelect = async (cityId) => {
    const selected = cities.find((c) => String(c.id) === String(cityId));
    setFormData((prev) => ({
      ...prev,
      city: selected?.name || "",
      cityId: selected?.id || "",
      district: "",
      districtId: "",
    }));
    await loadDistricts(selected?.id, "main", formData, setFormData);
  };

  const handleDistrictSelect = (districtId) => {
    const selected = districts.find((d) => String(d.id) === String(districtId));
    setFormData((prev) => ({
      ...prev,
      district: selected?.name || "",
      districtId: selected?.id || "",
    }));
  };

  const handleWorkplaceCitySelect = async (cityId) => {
    const selected = cities.find((c) => String(c.id) === String(cityId));
    setFormData((prev) => ({
      ...prev,
      workplaceCity: selected?.name || "",
      workplaceCityId: selected?.id || "",
      workplaceDistrict: "",
      workplaceDistrictId: "",
    }));
    await loadDistricts(selected?.id, "workplace", formData, setFormData);
  };

  const handleWorkplaceDistrictSelect = (districtId) => {
    const selected = workplaceDistricts.find((d) => String(d.id) === String(districtId));
    setFormData((prev) => ({
      ...prev,
      workplaceDistrict: selected?.name || "",
      workplaceDistrictId: selected?.id || "",
    }));
  };

  const canContinueStep1 = formData.firstName && formData.lastName && formData.tcKimlikNo && formData.birthDate && formData.birthPlace && isAtLeast18YearsOld(formData.birthDate);
  const canContinueStep2 = formData.email && formData.phone && formData.address && formData.city && formData.district;
  const canContinueStep3 = formData.companyName && formData.companyActivity && formData.capital;
  const canContinueStep5 = formData.workplaceAddress && formData.workplaceCity && formData.workplaceDistrict && formData.workplaceDocument;
  const canContinueStep6 = formData.identityDocument && formData.residenceDocument;

  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      setError("Giriş yapmanız gerekiyor");
      navigate('/login?redirect=/sirket-kurulusu');
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const urlCompanyType = sp.get('companyType') || companyType;
      const urlTier = sp.get('tier') || tier;
      const urlPeriod = sp.get('period') || period;

      const payload = {
        product_key: urlCompanyType,
        tier: urlTier,
        period: urlPeriod,
        personal_info: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          tcKimlikNo: formData.tcKimlikNo,
          birthDate: formData.birthDate,
          birthPlace: formData.birthPlace,
          maritalStatus: formData.maritalStatus || null,
          motherName: formData.motherName || null,
          fatherName: formData.fatherName || null,
        },
        contact_info: {
          email: formData.email,
          phone: getPhoneDigits(formData.phone),
          mobile: formData.mobile ? getPhoneDigits(formData.mobile) : null,
          address: formData.address,
          city: formData.city,
          district: formData.district,
          postal_code: formData.postalCode || null,
          postalCode: formData.postalCode || null,
        },
        company_info: {
          companyName: formData.companyName,
          companyActivity: formData.companyActivity,
          capital: formData.capital,
          partnerCount: formData.partnerCount || null,
          company_name: formData.companyName,
          company_activity: formData.companyActivity,
          partner_count: formData.partnerCount || null,
        },
        partners: formData.partners.filter(p => p.name || p.tcKimlikNo).map(p => ({
          name: p.name || null,
          tcKimlikNo: p.tcKimlikNo || null,
          tc_kimlik_no: p.tcKimlikNo || null,
          share: p.share || null,
          address: p.address || null,
        })),
        workplace_info: {
          workplaceAddress: formData.workplaceAddress,
          workplaceCity: formData.workplaceCity,
          workplaceDistrict: formData.workplaceDistrict,
          workplaceType: formData.workplaceType,
          workplace_address: formData.workplaceAddress,
          workplace_city: formData.workplaceCity,
          workplace_district: formData.workplaceDistrict,
          workplace_type: formData.workplaceType,
        },
        company_type: urlCompanyType,
        first_name: formData.firstName,
        last_name: formData.lastName,
        tc_kimlik_no: formData.tcKimlikNo,
        birth_date: formData.birthDate,
        birth_place: formData.birthPlace,
        marital_status: formData.maritalStatus || null,
        mother_name: formData.motherName || null,
        father_name: formData.fatherName || null,
        email: formData.email,
        phone: getPhoneDigits(formData.phone),
        mobile: formData.mobile ? getPhoneDigits(formData.mobile) : null,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        postal_code: formData.postalCode || null,
        company_name: formData.companyName,
        company_activity: formData.companyActivity,
        capital: formData.capital,
        partner_count: formData.partnerCount || null,
        workplace_address: formData.workplaceAddress,
        workplace_city: formData.workplaceCity,
        workplace_district: formData.workplaceDistrict,
        workplace_type: formData.workplaceType,
      };

      let registrationId = existingRegistrationId;

      if (existingRegistrationId) {
        await companyRegistrationApi.update(token, existingRegistrationId, payload);
      } else {
        const res = await companyRegistrationApi.create(token, payload);
        registrationId = res?.data?.id || res?.id;
      }

      if (!registrationId) {
        throw new Error("Başvuru oluşturulamadı");
      }

      const formDataToUpload = new FormData();
      if (formData.identityDocument) {
        formDataToUpload.append('identityDocument', formData.identityDocument);
      }
      if (formData.residenceDocument) {
        formDataToUpload.append('residenceDocument', formData.residenceDocument);
      }
      if (formData.workplaceDocument) {
        formDataToUpload.append('workplaceDocument', formData.workplaceDocument);
      }
      if (formData.partnershipAgreement) {
        formDataToUpload.append('partnershipAgreement', formData.partnershipAgreement);
      }
      if (formData.powerOfAttorney) {
        formDataToUpload.append('powerOfAttorney', formData.powerOfAttorney);
      }

      if (formDataToUpload.has('identityDocument') || formDataToUpload.has('residenceDocument')) {
        await companyRegistrationApi.uploadDocuments(token, registrationId, formDataToUpload);
      }

      await companyRegistrationApi.submit(token, registrationId);

      setSubmitSuccess(true);
      setCountdown(5);
      countdownRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            navigate('/profil/detay?tab=orders');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Başvuru hatası:", err);
      if (err?.status === 403) {
        setError("Bu şirket türü için ödeme yapılmamış. Lütfen önce ödeme yapınız.");
      } else {
        setError(err?.message || "Başvuru oluşturulurken bir hata oluştu");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (accessChecking) {
    return (
      <div className="bg-white min-h-screen">
        <section className="pt-28 pb-12 bg-work-navy-500 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Şirket Kuruluşu</h1>
            <p className="text-blue-100 text-lg">Erişim kontrol ediliyor...</p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Ödeme durumu kontrol ediliyor...</p>
          </div>
        </section>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="bg-white min-h-screen">
        <section className="pt-28 pb-12 bg-work-navy-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Şirket Kuruluşu
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-blue-100 text-lg"
            >
              Erişim kontrolü tamamlandı
            </motion.p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Decorative top gradient bar */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

              <div className="p-8 md:p-10 text-center">
                {/* Animated shield icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="w-24 h-24 mx-auto mb-8 relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 animate-pulse" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 flex items-center justify-center shadow-lg shadow-amber-100/50">
                    <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
                >
                  Erişim Engellendi
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-500 leading-relaxed mb-8 max-w-md mx-auto"
                >
                  {accessMessage}
                </motion.p>

                {/* Info callout */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-50/80 border border-blue-100 rounded-xl p-4 mb-8 text-left flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Ne yapmalıyım?</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Fiyatlar sayfasından uygun paketi seçerek ödeme yapabilir, ardından e-postanıza gelen bağlantı ile formu doldurabilirsiniz.
                    </p>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Link
                    to="/fiyatlar"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Paketleri İncele
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Ana Sayfa
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="bg-white min-h-screen">
        <section className="pt-28 pb-12 bg-work-navy-500 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Şirket Kuruluşu</h1>
            <p className="text-blue-100 text-lg">Başvurunuz tamamlandı.</p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Başvurunuz Sisteme Yüklenmiştir!</h2>
              <p className="text-gray-600 mb-6">
                Şirket kuruluş başvurunuz başarıyla alınmıştır. Başvurunuzun durumunu siparişleriniz
                sayfasından takip edebilirsiniz.
              </p>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  {countdown} saniye sonra yönlendirileceksiniz...
                </div>
              </div>
              <button
                onClick={() => {
                  if (countdownRef.current) clearInterval(countdownRef.current);
                  navigate('/profil/detay?tab=orders');
                }}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
              >
                Siparişlerime Git
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <CompanyRegistrationHeader step={step} setStep={setStep} />

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          {step === 1 && (
            <PersonalInfoStep
              formData={formData}
              handleInputChange={handleInputChange}
              setStep={setStep}
              canContinue={canContinueStep1}
            />
          )}

          {step === 2 && (
            <ContactInfoStep
              formData={formData}
              handleInputChange={handleInputChange}
              setStep={setStep}
              canContinue={canContinueStep2}
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              loadingAddresses={loadingAddresses}
              handleAddressSelect={handleAddressSelect}
              cities={cities}
              districts={districts}
              loadingLocations={loadingLocations}
              handleCitySelect={handleCitySelect}
              handleDistrictSelect={handleDistrictSelect}
            />
          )}

          {step === 3 && (
            <CompanyInfoStep
              formData={formData}
              handleInputChange={handleInputChange}
              setStep={setStep}
              canContinue={canContinueStep3}
              companyType={companyType}
              setCompanyType={setCompanyType}
              preselectedFromQuery={preselectedFromQuery}
            />
          )}

          {step === 4 && (
            <PartnersStep
              formData={formData}
              handlePartnerChange={handlePartnerChange}
              addPartner={addPartner}
              removePartner={removePartner}
              setStep={setStep}
            />
          )}

          {step === 5 && (
            <WorkplaceInfoStep
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileUpload={handleFileUpload}
              setStep={setStep}
              canContinue={canContinueStep5}
              cities={cities}
              workplaceDistricts={workplaceDistricts}
              loadingLocations={loadingLocations}
              handleWorkplaceCitySelect={handleWorkplaceCitySelect}
              handleWorkplaceDistrictSelect={handleWorkplaceDistrictSelect}
            />
          )}

          {step === 6 && (
            <DocumentsStep
              formData={formData}
              handleFileUpload={handleFileUpload}
              setStep={setStep}
              canContinue={canContinueStep6}
              submitting={submitting}
              error={error}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </div>
  );
}
