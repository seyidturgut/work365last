import { useEffect, useState, useCallback, useRef } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { customerApi, paymentsApi, locationApi, cartApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import StepAddress from "../components/checkout/StepAddress";
import StepMesafeliSozlesme from "../components/checkout/StepMesafeliSozlesme";
import StepCard from "../components/checkout/StepCard";
import StepSuccess from "../components/checkout/StepSuccess";
import StepError from "../components/checkout/StepError";
import OrderSummary from "../components/checkout/OrderSummary";
import AddressModal from "../components/checkout/AddressModal";

const EMPTY_ADDRESS_FORM = {
  label: "",
  name: "",
  phone: "",
  address: "",
  city: "",
  city_id: "",
  district: "",
  district_id: "",
  country: "Türkiye",
  postal_code: "",
  national_id: "",
  tax_number: "",
  is_default: false,
  is_billing: true,
};

export default function Checkout() {
  const { items, total, rawTotal, summary, refresh } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [remainingTime, setRemainingTime] = useState("");
  const discountExpiryHandled = useRef(false);

  useEffect(() => {
    const invalid = !Array.isArray(items) || items.length === 0 || (total || 0) <= 0;
    if (invalid) {
      navigate("/sepet", { replace: true });
    }
  }, [items, total, navigate]);

  useEffect(() => {
    discountExpiryHandled.current = false;
    if (!summary?.discount?.expires_at) {
      setRemainingTime("");
      return;
    }
    const expiresAt = new Date(summary.discount.expires_at);

    const updateRemaining = () => {
      const now = new Date();
      const diffMs = expiresAt.getTime() - now.getTime();
      if (diffMs <= 0) {
        setRemainingTime("Süre doldu");
        if (!discountExpiryHandled.current) {
          discountExpiryHandled.current = true;
          refresh();
        }
        return;
      }
      const totalSec = Math.floor(diffMs / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      setRemainingTime(`${minutes} dk ${seconds.toString().padStart(2, "0")} sn`);
    };

    updateRemaining();
    const id = setInterval(updateRemaining, 1000);
    return () => clearInterval(id);
  }, [summary?.discount?.code, summary?.discount?.expires_at, refresh]);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    taxNumber: "",
    country: "Türkiye",
    city: "",
    district: "",
    address: "",
    postalCode: "",
  });

  const [cardState, setCardState] = useState({ number: "", name: "", month: "", year: "", cvv: "" });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [installments, setInstallments] = useState([]);
  const [selectedInstallment, setSelectedInstallment] = useState(1);
  const [loadingBinCheck, setLoadingBinCheck] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({ ...EMPTY_ADDRESS_FORM });
  const [editingAddress, setEditingAddress] = useState(null);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressSuccess, setAddressSuccess] = useState("");
  const [privacyAgreementAccepted, setPrivacyAgreementAccepted] = useState(false);
  const [distanceSalesAccepted, setDistanceSalesAccepted] = useState(false);

  useEffect(() => {
    if (user?.email && !billing.email) {
      setBilling((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  useEffect(() => {
    const loadCities = async () => {
      setLoadingCities(true);
      try {
        const res = await locationApi.cities();
        const citiesList = res?.data || res || [];
        setCities(Array.isArray(citiesList) ? citiesList : []);
      } catch (e) {
        console.error("Şehirler yüklenemedi:", e);
      } finally {
        setLoadingCities(false);
      }
    };
    if (showAddressModal) {
      loadCities();
    }
  }, [showAddressModal]);

  useEffect(() => {
    const loadDistricts = async (cityId) => {
      if (!cityId) {
        setDistricts([]);
        return;
      }
      setLoadingDistricts(true);
      try {
        const res = await locationApi.districts(cityId);
        const districtsList = res?.data || res || [];
        setDistricts(Array.isArray(districtsList) ? districtsList : []);
      } catch (e) {
        console.error("İlçeler yüklenemedi:", e);
      } finally {
        setLoadingDistricts(false);
      }
    };
    if (addressForm.city_id) {
      loadDistricts(addressForm.city_id);
    } else {
      setDistricts([]);
    }
  }, [addressForm.city_id]);

  useEffect(() => {
    if (!showAddressModal || !editingAddress || addressForm.city_id || !editingAddress.city) return;
    if (!cities.length) return;
    const match = cities.find((city) => city?.name?.toLowerCase() === editingAddress.city.toLowerCase());
    if (match) {
      setAddressForm((prev) => ({
        ...prev,
        city_id: String(match.id),
        city: match.name || prev.city,
      }));
    }
  }, [showAddressModal, editingAddress, cities, addressForm.city_id]);

  useEffect(() => {
    if (!showAddressModal || !editingAddress || !addressForm.city_id || addressForm.district_id || !editingAddress.district) return;
    if (!districts.length) return;
    const match = districts.find((district) => district?.name?.toLowerCase() === editingAddress.district.toLowerCase());
    if (match) {
      setAddressForm((prev) => ({
        ...prev,
        district_id: String(match.id),
        district: match.name || prev.district,
      }));
    }
  }, [showAddressModal, editingAddress, addressForm.city_id, addressForm.district_id, districts]);

  const fillBillingFromAddress = useCallback(
    (address) => {
      if (!address) return;
      const nameParts = (address.name || "").split(" ").filter(Boolean);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setBilling((prev) => ({
        firstName,
        lastName,
        email: user?.email || prev.email || "",
        phone: address.phone || "",
        company: "",
        taxNumber: address.national_id || address.tax_number || "",
        country: address.country || "Türkiye",
        city: address.city || "",
        district: address.district || "",
        address: address.address || "",
        postalCode: address.postal_code || "",
      }));
    },
    [user?.email]
  );

  const canContinue =
    addresses.length > 0
      ? Boolean(
          selectedAddressId &&
            billing.firstName &&
            billing.lastName &&
            billing.email &&
            billing.address &&
            billing.city &&
            billing.district
        )
      : false;

  const reloadAddresses = useCallback(
    async (preferredId = null, currentSelectedId = null) => {
      const token = getToken();
      if (!token) return [];
      setLoadingAddresses(true);
      try {
        const res = await customerApi.addresses(token);
        const list = res?.data || res || [];
        const addressesList = Array.isArray(list) ? list : [];
        setAddresses(addressesList);

        let nextSelectedId = preferredId ?? currentSelectedId;
        if (!nextSelectedId && addressesList.length > 0) {
          const defaultBilling =
            addressesList.find((a) => a.is_billing) ||
            addressesList.find((a) => a.is_default) ||
            addressesList[0];
          nextSelectedId = defaultBilling?.id;
        }

        if (nextSelectedId) {
          const target = addressesList.find((addr) => addr.id === nextSelectedId) || addressesList[0];
          if (target) {
            setSelectedAddressId(target.id);
            fillBillingFromAddress(target);
          }
        } else {
          setSelectedAddressId(null);
        }

        return addressesList;
      } catch (err) {
        console.error("Adresler yüklenemedi:", err);
        return [];
      } finally {
        setLoadingAddresses(false);
      }
    },
    [fillBillingFromAddress]
  );

  useEffect(() => {
    reloadAddresses();
  }, [reloadAddresses]);

  const mapAddressToForm = (address) => ({
    label: address?.label || "",
    name: address?.name || "",
    phone: address?.phone || "",
    address: address?.address || "",
    city: address?.city || "",
    city_id: address?.city_id ? String(address.city_id) : "",
    district: address?.district || "",
    district_id: address?.district_id ? String(address.district_id) : "",
    country: address?.country || "Türkiye",
    postal_code: address?.postal_code || "",
    national_id: address?.national_id || "",
    tax_number: address?.tax_number || "",
    is_default: Boolean(address?.is_default),
    is_billing: address?.is_billing !== undefined ? Boolean(address.is_billing) : true,
  });

  const resetAddressForm = () => {
    setAddressForm({
      ...EMPTY_ADDRESS_FORM,
      is_default: addresses.length === 0 ? true : EMPTY_ADDRESS_FORM.is_default,
    });
    setDistricts([]);
  };

  const closeAddressModal = () => {
    setShowAddressModal(false);
    setEditingAddress(null);
    setAddressError("");
    setAddressSuccess("");
    resetAddressForm();
  };

  const openAddressModal = (address = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm(mapAddressToForm(address));
    } else {
      setEditingAddress(null);
      resetAddressForm();
    }
    setAddressError("");
    setAddressSuccess("");
    setShowAddressModal(true);
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find((a) => a.id === addressId);
    if (selectedAddress) {
      fillBillingFromAddress(selectedAddress);
    }
  };

  const handleSaveAddress = async () => {
    const token = getToken();
    if (!token) {
      setAddressError("Oturum açmanız gerekiyor.");
      return;
    }

    const trimmedName = (addressForm.name || "").trim();
    if (!trimmedName) {
      setAddressError("Lütfen ad ve soyad bilgilerinizi girin.");
      return;
    }
    if (trimmedName.split(/\s+/).length < 2) {
      setAddressError("Soyad bilgisi eksik görünüyor. Lütfen ad ve soyadı birlikte girin.");
      return;
    }

    if (!addressForm.phone || !addressForm.address || !addressForm.city || !addressForm.district) {
      setAddressError("Lütfen zorunlu alanları doldurun.");
      return;
    }

    setSavingAddress(true);
    setAddressError("");
    setAddressSuccess("");

    const isFirstAddress = addresses.length === 0;

    const payload = {
      ...addressForm,
      is_default: isFirstAddress ? true : addressForm.is_default,
      city_id: addressForm.city_id || undefined,
      district_id: addressForm.district_id || undefined,
    };

    try {
      let preferredId = editingAddress?.id || null;
      if (editingAddress) {
        await customerApi.updateAddress(token, editingAddress.id, payload);
        setAddressSuccess("Adres güncellendi!");
      } else {
        const created = await customerApi.createAddress(token, payload);
        const createdData = created?.data || created;
        if (createdData && createdData.id) {
          preferredId = createdData.id;
        }
        setAddressSuccess("Adres başarıyla kaydedildi!");
      }

      const latestAddresses = await reloadAddresses(preferredId, selectedAddressId);
      if (!preferredId && Array.isArray(latestAddresses) && latestAddresses.length > 0) {
        const newestAddress = latestAddresses[latestAddresses.length - 1];
        if (newestAddress?.id) {
          setSelectedAddressId(newestAddress.id);
          fillBillingFromAddress(newestAddress);
        }
      }

      setTimeout(() => {
        closeAddressModal();
      }, 1200);
    } catch (err) {
      setAddressError(err?.message || "Adres kaydedilemedi.");
    } finally {
      setSavingAddress(false);
    }
  };

  const handleCardNumberChange = async (value) => {
    const cleaned = value.replace(/\s/g, "");
    setCardState((prev) => ({ ...prev, number: cleaned }));

    if (cleaned.length >= 6) {
      const binNumber = cleaned.substring(0, 6);
      const token = getToken();
      if (!token) return;

      setLoadingBinCheck(true);
      try {
        const res = await paymentsApi.binCheck(token, binNumber, total.toString());
        if (res?.status === "success" && Array.isArray(res.installments)) {
          setInstallments(res.installments);
          if (res.installments.length > 0) {
            setSelectedInstallment(res.installments[0].installment_number || 1);
          }
        } else {
          setInstallments([]);
          setSelectedInstallment(1);
        }
      } catch (err) {
        console.error("BIN check hatası:", err);
        setInstallments([]);
        setSelectedInstallment(1);
      } finally {
        setLoadingBinCheck(false);
      }
    } else {
      setInstallments([]);
      setSelectedInstallment(1);
    }
  };

  const handlePayment = async () => {
    const cleanedCardNumber = cardState.number.replace(/\s/g, "");
    if (!cleanedCardNumber || cleanedCardNumber.length < 16) {
      setError("Kart numarası geçersiz. Lütfen 16 haneli kart numaranızı girin.");
      setStep(5);
      return;
    }
    if (!cardState.name || !cardState.month || !cardState.year || !cardState.cvv) {
      setError("Lütfen tüm kart bilgilerini eksiksiz doldurun.");
      setStep(5);
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login?redirect=/odeme");
      return;
    }

    try {
      const latestCart = await cartApi.list(token);
      const latestDiscount = Object.prototype.hasOwnProperty.call(latestCart || {}, "discount")
        ? latestCart.discount
        : null;
      if (!latestDiscount && summary?.discount) {
        setError("İndirim kodunuzun süresi doldu veya kaldırıldı. Tutar güncellendi, lütfen ödemeyi tekrar başlatın.");
        setStep(5);
        await refresh();
        return;
      }
    } catch (cartErr) {
      console.error("Sepet doğrulama hatası:", cartErr);
    }

    setProcessingPayment(true);
    setError(null);

    try {
      const callbackUrl = `${window.location.origin}/payment-result`;

      const cardData = {
        card_holder_name: cardState.name,
        card_number: cleanedCardNumber,
        expire_month: cardState.month.padStart(2, "0"),
        expire_year: `20${cardState.year}`,
        cvc: cardState.cvv,
      };

      const mapAddress = (addr) => {
        if (!addr) return null;
        const contactName =
          addr.name ||
          `${billing.firstName || ""} ${billing.lastName || ""}`.trim() ||
          user?.name ||
          user?.full_name ||
          "";
        const city = addr.city || billing.city || "";
        const country = addr.country || billing.country || "Turkey";
        const fullAddress = addr.address || billing.address || "";
        const zip = addr.postal_code || billing.postalCode || "00000";

        return {
          contact_name: contactName,
          city,
          country,
          address: fullAddress,
          zip_code: zip,
        };
      };

      const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0] || null;

      const billingAddressPayload =
        mapAddress(selectedAddress) ||
        mapAddress({
          name: `${billing.firstName || ""} ${billing.lastName || ""}`.trim(),
          city: billing.city,
          country: billing.country || "Turkey",
          address: billing.address,
          postal_code: billing.postalCode,
        });

      const shippingAddressPayload = billingAddressPayload;

      const payload = {
        card: cardData,
        installment: selectedInstallment,
        frontend_callback_url: callbackUrl,
      };

      if (billingAddressPayload) {
        payload.billing_address = billingAddressPayload;
        payload.buyerRegistrationAddress = billingAddressPayload;
      }
      if (shippingAddressPayload) {
        payload.shipping_address = shippingAddressPayload;
      }

      const addressString = billingAddressPayload
        ? [billingAddressPayload.address, billingAddressPayload.city, billingAddressPayload.zip_code, billingAddressPayload.country].filter(Boolean).join(", ")
        : undefined;
      await customerApi.acceptConfidentialityAgreement(token, { address: addressString });

      const res = await paymentsApi.initialize3DS(token, payload);

      if (res?.status === "success" && res.three_ds_html_content) {
        if (res.order_id) {
          localStorage.setItem("current_order_id", res.order_id);
        }

        try {
          let encodedHtml = res.three_ds_html_content;
          if (res.three_ds_html_content.trim().startsWith("<")) {
            encodedHtml = btoa(unescape(encodeURIComponent(res.three_ds_html_content)));
          }

          const urlEncoded = encodeURIComponent(encodedHtml);
          navigate(`/3ds-verify?html=${urlEncoded}`);
        } catch (encodeError) {
          console.error("3DS içerik encode hatası:", encodeError);
          const urlEncoded = encodeURIComponent(res.three_ds_html_content);
          navigate(`/3ds-verify?html=${urlEncoded}`);
        }
      } else {
        throw new Error(res?.message || "Ödeme başlatılamadı");
      }
    } catch (err) {
      console.error("Ödeme hatası:", err);
      setError(err?.message || err?.data?.message || "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      setStep(5);
    } finally {
      setProcessingPayment(false);
    }
  };

  useEffect(() => {
    if (step === 4) {
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      if (redirect) {
        const timer = setTimeout(() => navigate(redirect), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [step, location.search, navigate]);

  useEffect(() => {
    if (!user) {
      window.location.replace("/");
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-white min-h-[60vh]">
      <section className="relative bg-work-navy-500 text-white py-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Ödeme</h1>
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">Adres/fatura bilgileri ve kart bilgilerinizi girin.</p>
          </motion.div>

          <CheckoutStepper step={step} setStep={setStep} />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-8 max-w-6xl">
          <div className={`${step === 4 || step === 5 ? "lg:col-span-3" : "lg:col-span-2"} space-y-6`}>
            {step === 1 && (
              <StepAddress
                error={error}
                loadingAddresses={loadingAddresses}
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                handleAddressSelect={handleAddressSelect}
                openAddressModal={openAddressModal}
                canContinue={canContinue}
                setStep={setStep}
              />
            )}

            {step === 2 && (
              <StepMesafeliSozlesme
                setStep={setStep}
                distanceSalesAccepted={distanceSalesAccepted}
                setDistanceSalesAccepted={setDistanceSalesAccepted}
                onContinue={async () => {
                  setError(null);
                  const token = getToken();
                  if (!token) {
                    navigate("/login?redirect=/odeme");
                    return;
                  }
                  try {
                    await customerApi.acceptDistanceSalesAgreement(token);
                    setStep(3);
                  } catch (e) {
                    const msg = e?.message || e?.data?.message || "Mesafeli satış sözleşmesi kaydı alınamadı. Lütfen tekrar deneyin.";
                    setError(msg);
                    setStep(5);
                    throw e;
                  }
                }}
              />
            )}

            {step === 3 && (
              <StepCard
                error={error}
                addresses={addresses}
                loadingAddresses={loadingAddresses}
                openAddressModal={openAddressModal}
                handleCardNumberChange={handleCardNumberChange}
                cardState={cardState}
                setCardState={setCardState}
                installments={installments}
                selectedInstallment={selectedInstallment}
                setSelectedInstallment={setSelectedInstallment}
                loadingBinCheck={loadingBinCheck}
                processingPayment={processingPayment}
                handlePayment={handlePayment}
                canContinue={canContinue}
                setStep={setStep}
                privacyAgreementAccepted={privacyAgreementAccepted}
                setPrivacyAgreementAccepted={setPrivacyAgreementAccepted}
              />
            )}

            {step === 4 && <StepSuccess total={total} billing={billing} setStep={setStep} navigate={navigate} />}

            {step === 5 && <StepError error={error} setError={setError} setStep={setStep} navigate={navigate} />}
          </div>

          {step !== 4 && step !== 5 && (() => {
            // Seçilen taksitin toplam tutarını hesapla
            const selectedInst = installments.find(inst => inst.installment_number === selectedInstallment);
            const displayTotal = selectedInst?.total_price 
              ? parseFloat(selectedInst.total_price) 
              : total;
            
            return (
              <OrderSummary 
                items={items} 
                summary={summary} 
                total={displayTotal} 
                rawTotal={rawTotal} 
                remainingTime={remainingTime}
                selectedInstallment={selectedInstallment}
                installments={installments}
              />
            );
          })()}
        </div>
      </section>

      <AddressModal
        showAddressModal={showAddressModal}
        closeAddressModal={closeAddressModal}
        addressError={addressError}
        addressSuccess={addressSuccess}
        addressForm={addressForm}
        setAddressForm={setAddressForm}
        cities={cities}
        districts={districts}
        loadingCities={loadingCities}
        loadingDistricts={loadingDistricts}
        savingAddress={savingAddress}
        handleSaveAddress={handleSaveAddress}
        editingAddress={editingAddress}
        addresses={addresses}
      />
    </div>
  );
}

