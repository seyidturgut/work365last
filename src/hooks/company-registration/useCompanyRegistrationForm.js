import { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { customerApi } from "../../lib/api";
import { getToken } from "../../lib/auth";
import { formatPhoneNumber, getPhoneDigits } from "../../lib/phoneUtils";
import { formatCurrencyDisplay } from "../../utils/companyRegistrationUtils";

const initialFormData = {
  firstName: "",
  lastName: "",
  tcKimlikNo: "",
  birthDate: "",
  birthPlace: "",
  maritalStatus: "",
  motherName: "",
  fatherName: "",
  email: "",
  phone: "",
  mobile: "",
  address: "",
  city: "",
  cityId: "",
  district: "",
  districtId: "",
  postalCode: "",
  companyName: "",
  companyActivity: "",
  capital: "",
  partnerCount: "",
  partners: [{ name: "", tcKimlikNo: "", share: "", address: "" }],
  workplaceAddress: "",
  workplaceCity: "",
  workplaceCityId: "",
  workplaceDistrict: "",
  workplaceDistrictId: "",
  workplaceType: "",
  workplaceDocument: null,
  identityDocument: null,
  residenceDocument: null,
  partnershipAgreement: null,
  powerOfAttorney: null,
};

export function useCompanyRegistrationForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [companyType, setCompanyType] = useState("limited");
  const [tier, setTier] = useState("standard");
  const [period, setPeriod] = useState("monthly");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [sp] = useSearchParams();
  const preselectedFromQuery = !!(typeof window !== 'undefined' && sp.get('companyType'));

  useEffect(() => {
    const token = getToken();
    if (!token) {
      const redirectTo = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const c = sp.get('companyType');
    if (c && ["sahis", "limited", "anonim", "bilanco"].includes(c)) {
      setCompanyType(c);
    }
    const t = sp.get('tier');
    if (t && ["standard", "advanced"].includes(t)) {
      setTier(t);
    }
    const p = sp.get('period');
    if (p && ["monthly", "yearly"].includes(p)) {
      setPeriod(p);
    }
    (async () => {
      const token = getToken();
      if (!token) return;
      try {
        const details = await customerApi.details(token);
        const d = details?.data || details || {};
        let phoneCandidate = d.phone ?? d.mobile ?? d.gsm ?? "";
        let meUser;
        try {
          const me = await customerApi.me(token);
          const mu = me?.data || me || {};
          meUser = mu;
          if (!phoneCandidate) phoneCandidate = mu.phone ?? phoneCandidate;
        } catch { }
        let fullName = (d.name || "").toString().trim();
        if (!fullName && meUser?.name) fullName = String(meUser.name).trim();
        const [first, ...rest] = fullName.split(/\s+/);
        const last = rest.join(" ");
        const tcFromDetails = d.national_id || d.tc || d.tckn || d.identity_no || d.identity_number || "";
        const tcFromMe = meUser?.national_id || meUser?.tc || meUser?.tckn || meUser?.identity_no || meUser?.identity_number || meUser?.default_address?.national_id || "";
        setFormData(prev => ({
          ...prev,
          firstName: prev.firstName || (first || ""),
          lastName: prev.lastName || (last || ""),
          email: prev.email || d.email || (meUser?.email || ""),
          phone: prev.phone || phoneCandidate || "",
          mobile: prev.mobile || phoneCandidate || "",
          tcKimlikNo: prev.tcKimlikNo || tcFromDetails || tcFromMe || "",
        }));
        const def = meUser?.default_address || null;
        if (def) {
          setFormData(prev => ({
            ...prev,
            address: prev.address || def.address || "",
            city: prev.city || def.city || "",
            cityId: prev.cityId || def.city_id || "",
            district: prev.district || def.district || "",
            districtId: prev.districtId || def.district_id || "",
            postalCode: prev.postalCode || def.postal_code || "",
          }));
        } else {
          const addrs = await customerApi.addresses(token);
          const list = addrs?.data || addrs || [];
          const billing = list.find(a => a.is_billing) || list.find(a => a.is_default);
          if (billing) {
            setFormData(prev => ({
              ...prev,
              address: prev.address || billing.address || "",
              city: prev.city || billing.city || "",
              cityId: prev.cityId || billing.city_id || "",
              district: prev.district || billing.district || "",
              districtId: prev.districtId || billing.district_id || "",
              postalCode: prev.postalCode || billing.postal_code || "",
            }));
          }
        }
      } catch { }
    })();
  }, []);

  const handleInputChange = (field, value) => {
    if (field === 'capital') {
      const digitsOnly = value.toString().replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [field]: digitsOnly }));
      return;
    }
    if (field === 'phone' || field === 'mobile') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [field]: formatted }));
      return;
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePartnerChange = (index, field, value) => {
    setFormData(prev => {
      const partners = [...prev.partners];
      partners[index] = { ...partners[index], [field]: value };
      return { ...prev, partners };
    });
  };

  const addPartner = () => {
    setFormData(prev => ({
      ...prev,
      partners: [...prev.partners, { name: "", tcKimlikNo: "", share: "", address: "" }]
    }));
  };

  const removePartner = (index) => {
    setFormData(prev => ({
      ...prev,
      partners: prev.partners.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  return {
    formData,
    setFormData,
    step,
    setStep,
    companyType,
    setCompanyType,
    tier,
    setTier,
    period,
    setPeriod,
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
  };
}

