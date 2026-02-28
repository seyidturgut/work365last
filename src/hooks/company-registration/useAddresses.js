import { useState, useEffect } from "react";
import { customerApi } from "../../lib/api";
import { getToken } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext";

export function useAddresses(formData, setFormData) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadAddresses = async () => {
      const token = getToken();
      if (!token) return;
      setLoadingAddresses(true);
      try {
        const res = await customerApi.addresses(token);
        const list = res?.data || res || [];
        const addressesList = Array.isArray(list) ? list : [];
        setAddresses(addressesList);
        if (addressesList.length > 0) {
          const defaultBilling = addressesList.find(a => a.is_billing) || addressesList.find(a => a.is_default) || addressesList[0];
          if (defaultBilling) {
            setSelectedAddressId(defaultBilling.id);
            fillContactFromAddress(defaultBilling);
          }
        }
      } catch (err) {
        console.error("Adresler yüklenemedi:", err);
      } finally {
        setLoadingAddresses(false);
      }
    };
    loadAddresses();
  }, []);

  const fillContactFromAddress = (address) => {
    if (!address) return;
    setFormData(prev => ({
      ...prev,
      email: user?.email || prev.email || "",
      phone: address.phone || prev.phone || "",
      mobile: address.phone || prev.mobile || "",
      address: address.address || prev.address || "",
      city: address.city || prev.city || "",
      cityId: address.city_id || prev.cityId || "",
      district: address.district || prev.district || "",
      districtId: address.district_id || prev.districtId || "",
      postalCode: address.postal_code || prev.postalCode || "",
    }));
    const cityId = address.city_id || formData.cityId;
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selectedAddress = addresses.find(a => a.id === addressId);
    if (selectedAddress) {
      fillContactFromAddress(selectedAddress);
    }
  };

  return {
    addresses,
    selectedAddressId,
    loadingAddresses,
    handleAddressSelect,
  };
}

