import { useState, useEffect } from "react";
import { locationApi } from "../../lib/api";

export function useLocations() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [workplaceDistricts, setWorkplaceDistricts] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  useEffect(() => {
    (async () => {
      setLoadingLocations(true);
      try {
        const res = await locationApi.cities();
        const list = res?.data || res || [];
        setCities(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("İl listesi alınamadı", e);
      } finally {
        setLoadingLocations(false);
      }
    })();
  }, []);

  const loadDistricts = async (cityId, target = "main", formData, setFormData) => {
    if (!cityId) {
      if (target === "main") setDistricts([]);
      if (target === "workplace") setWorkplaceDistricts([]);
      return;
    }
    try {
      const res = await locationApi.districts(cityId);
      const list = res?.data || res || [];
      if (target === "main") {
        setDistricts(list);
        const match =
          list.find((d) => d.id === formData.districtId) ||
          list.find((d) => d.name === formData.district);
        setFormData((prev) => ({
          ...prev,
          district: match?.name || "",
          districtId: match?.id || "",
        }));
      } else {
        setWorkplaceDistricts(list);
        const match =
          list.find((d) => d.id === formData.workplaceDistrictId) ||
          list.find((d) => d.name === formData.workplaceDistrict);
        setFormData((prev) => ({
          ...prev,
          workplaceDistrict: match?.name || "",
          workplaceDistrictId: match?.id || "",
        }));
      }
    } catch (e) {
      console.error("İlçe listesi alınamadı", e);
    }
  };

  return {
    cities,
    districts,
    workplaceDistricts,
    loadingLocations,
    loadDistricts,
  };
}

