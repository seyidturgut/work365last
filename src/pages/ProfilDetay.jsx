import { useEffect, useMemo, useState } from "react";
import { customerApi, locationApi, ordersApi, additionalDocumentsApi, companyRegistrationApi, documentRequestApi, accountantTasksApi, declarationsApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PdfPreviewModal from "../components/profile/PdfPreviewModal";
import Toast from "../components/profile/Toast";
import ProfileTabsContent from "../components/profile/ProfileTabsContent";
import usePendingRegistrations from "../hooks/usePendingRegistrations";
import usePendingDocuments, { pendingDocumentDefinitions } from "../hooks/usePendingDocuments";
import useOrders from "../hooks/useOrders";
import AddressFormModal from "../components/profile/modals/AddressFormModal";
import AddressManagerModal from "../components/profile/modals/AddressManagerModal";
import ExtraDocumentModal from "../components/profile/modals/ExtraDocumentModal";
import PendingDocumentsModal from "../components/profile/modals/PendingDocumentsModal";
import DeleteConfirmModal from "../components/profile/modals/DeleteConfirmModal";
import PendingSummaryModal from "../components/profile/modals/PendingSummaryModal";
import AccountantTaskDetailModal from "../components/profile/modals/AccountantTaskDetailModal";
import { profileTabs } from "../constants/profileTabs";
import { getLabelTR } from "../utils/profileLabels";

export default function ProfilDetay() {
  const navigate = useNavigate();
  const { refresh: refreshCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(searchParams.get('tab') || 'orders');
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [savedNotice, setSavedNotice] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loadingInvoices, setLoadingInvoices] = useState(false);
  const [invoicesPagination, setInvoicesPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("all");
  const [pdfPreview, setPdfPreview] = useState({ show: false, url: "", title: "", invoiceId: null, originalUrl: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [form, setForm] = useState({
    label: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    city_id: "",
    district: "",
    district_id: "",
    country: "",
    postal_code: "",
    national_id: "",
    tax_number: "",
    is_default: false,
    is_billing: false,
  });
  const [documentRequests, setDocumentRequests] = useState([]);
  const [loadingDocumentRequests, setLoadingDocumentRequests] = useState(false);
  const [documentRequestsPagination, setDocumentRequestsPagination] = useState({
    current_page: 1,
    per_page: 8,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  const [accountantTasks, setAccountantTasks] = useState([]);
  const [loadingAccountantTasks, setLoadingAccountantTasks] = useState(false);
  const [accountantTasksError, setAccountantTasksError] = useState("");
  const [accountantTasksPagination, setAccountantTasksPagination] = useState({
    current_page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });
  const [accountantDetailModalOpen, setAccountantDetailModalOpen] = useState(false);
  const [selectedAccountantTaskId, setSelectedAccountantTaskId] = useState(null);

  // Declarations State
  const [declarations, setDeclarations] = useState([]);
  const [loadingDeclarations, setLoadingDeclarations] = useState(false);
  const [declarationsError, setDeclarationsError] = useState("");
  const [declarationsPagination, setDeclarationsPagination] = useState({
    current_page: 1,
    per_page: 20,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  const {
    pendingRegistrations,
    loadingPending,
    pendingMsg,
    pendingErr,
    addingPendingId,
    deletingPendingId,
    deleteConfirmModalOpen,
    pendingToDelete,
    setPendingMsg,
    setPendingErr,
    loadPendingRegistrations,
    handlePendingAddToCart,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    handleDeletePendingRegistration,
  } = usePendingRegistrations({
    getToken,
    navigate,
    refreshCart,
    companyRegistrationApi,
  });

  const { orders, orderSearch, setOrderSearch, loadingOrders, ordersPagination, loadOrders, filteredOrders } = useOrders({
    getToken,
    ordersApi,
  });

  const {
    pendingDocModalOpen,
    pendingDocLoading,
    pendingDocRegistration,
    pendingDocForm,
    pendingDocMsg,
    pendingDocErr,
    uploadingPendingDocs,
    pendingSummaryModalOpen,
    setPendingSummaryModalOpen,
    openPendingDocumentsModal,
    closePendingDocumentsModal,
    handlePendingDocumentFile,
    handlePendingDocumentsSave,
    setPendingDocErr,
    setPendingDocMsg,
  } = usePendingDocuments({
    getToken,
    navigate,
    companyRegistrationApi,
    loadPendingRegistrations,
  });

  const headerTabs = useMemo(
    () => profileTabs.filter((t) => ["orders", "pending", "addresses", "accountant-tasks", "declarations"].includes(t.key)),
    []
  );

  const loadAccountantTasks = async (page = 1) => {
    const token = getToken();
    if (!token) return;
    setLoadingAccountantTasks(true);
    setAccountantTasksError("");
    try {
      const res = await accountantTasksApi.list(token, page);
      const list = res?.data?.data || res?.data || [];
      setAccountantTasks(Array.isArray(list) ? list : []);
      if (res?.data && res.data.total !== undefined) {
        setAccountantTasksPagination({
          current_page: res.data.current_page || 1,
          per_page: res.data.per_page || 10,
          total: res.data.total || 0,
          last_page: res.data.last_page || 1,
          from: res.data.from || 0,
          to: res.data.to || 0,
        });
      }
    } catch (e) {
      setAccountantTasksError("Muhasebe görevleri yüklenirken bir hata oluştu.");
      setAccountantTasks([]);
    } finally {
      setLoadingAccountantTasks(false);
    }
  };

  const openAccountantTaskModal = (task) => {
    setSelectedAccountantTaskId(task.id);
    setAccountantDetailModalOpen(true);
  };

  const closeAccountantTaskModal = () => {
    setAccountantDetailModalOpen(false);
    setSelectedAccountantTaskId(null);
  };

  const loadDeclarations = async (page = 1) => {
    const token = getToken();
    if (!token) return;
    setLoadingDeclarations(true);
    setDeclarationsError("");
    try {
      const res = await declarationsApi.list(token, page);
      const list = res?.data?.data || res?.data || [];
      setDeclarations(Array.isArray(list) ? list : []);
      if (res?.meta) {
        setDeclarationsPagination({
          current_page: res.meta.current_page || 1,
          per_page: res.meta.per_page || 20,
          total: res.meta.total || 0,
          last_page: res.meta.last_page || 1,
          from: res.meta.from || 0,
          to: res.meta.to || 0,
        });
      }
    } catch (e) {
      setDeclarationsError("Beyannameler yüklenirken bir hata oluştu.");
      setDeclarations([]);
    } finally {
      setLoadingDeclarations(false);
    }
  };

  const handleViewDeclaration = async (decl) => {
    const url = decl.file_url || `${import.meta.env.VITE_STORAGE_URL}/${decl.file_path}`;

    // Use PdfPreviewModal state
    setPdfPreview({
      show: true,
      url: url,
      title: decl.name,
      invoiceId: null, // This is for invoices, not needed here but kept for schema
      originalUrl: url
    });

    // Mark as read if it's new
    if (decl.status === 'uploaded') {
      const token = getToken();
      if (!token) return;
      try {
        await declarationsApi.markAsRead(token, decl.id);
        // Silently update the status in the list
        setDeclarations(prev => prev.map(d => d.id === decl.id ? { ...d, status: 'viewed' } : d));
      } catch (e) {
        console.error("Failed to mark declaration as read:", e);
      }
    }
  };

  const loadDocumentRequests = async (page = 1) => {
    const token = getToken();
    if (!token) return;
    setLoadingDocumentRequests(true);
    try {
      const res = await documentRequestApi.list(token, page, 8);
      if (res) {
        const list = res?.data || res || [];
        setDocumentRequests(Array.isArray(list) ? list : []);
        if (res.meta) {
          setDocumentRequestsPagination({
            current_page: res.meta.current_page || 1,
            per_page: res.meta.per_page || 8,
            total: res.meta.total || 0,
            last_page: res.meta.last_page || 1,
            from: res.meta.from || 0,
            to: res.meta.to || 0,
          });
        }
      } else {
        setDocumentRequests([]);
      }
    } catch (e) {
      setDocumentRequests([]);
    } finally {
      setLoadingDocumentRequests(false);
    }
  };

  const loadAddresses = async () => {
    const token = getToken();
    if (!token) return;
    setLoading(true);
    setMsg("");
    setErr("");
    try {
      const res = await customerApi.addresses(token);
      const list = res?.data || res || [];
      setAddresses(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e?.message || "Adresler yüklenemedi.");
    }
    setLoading(false);
  };

  const loadInvoices = async (page = 1) => {
    const token = getToken();
    if (!token) return;
    setLoadingInvoices(true);
    try {
      const res = await customerApi.invoices(token, page, 10);
      const list = res?.data || res || [];
      setInvoices(Array.isArray(list) ? list : []);
      if (res?.meta) {
        setInvoicesPagination({
          current_page: res.meta.current_page || 1,
          per_page: res.meta.per_page || 10,
          total: res.meta.total || 0,
          last_page: res.meta.last_page || 1,
          from: res.meta.from || 0,
          to: res.meta.to || 0,
        });
      }
    } catch (e) {
      setInvoices([]);
    } finally {
      setLoadingInvoices(false);
    }
  };

  useEffect(() => {
    loadAddresses();
    loadCities();
    loadOrders();
    loadPendingRegistrations();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActive(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (active === 'document-requests' || active === 'pending' || active === 'service-requests') {
      loadDocumentRequests();
    }
    if (active === 'invoices') {
      loadInvoices(1);
    }
    if (active === 'invoices') {
      loadInvoices(1);
    }
    if (active === 'accountant-tasks') {
      loadAccountantTasks(1);
    }
    if (active === 'declarations') {
      loadDeclarations(1);
    }
  }, [active]);

  useEffect(() => {
    setSearchParams({ tab: active });
  }, [active, setSearchParams]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };


  const openDocumentModal = (order) => {
    setSelectedOrder(order);
    setDocumentForm({ title: "", description: "", file: null });
    setErr("");
    setMsg("");
    setDocumentModalOpen(true);
  };

  const handleDocumentUpload = async () => {
    const token = getToken();
    if (!token || !selectedOrder) return;

    if (!documentForm.title || !documentForm.file) {
      setErr("Başlık ve dosya zorunludur.");
      return;
    }

    setUploadingDocument(true);
    setErr("");
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("file", documentForm.file);
      formData.append("title", documentForm.title);
      if (documentForm.description) {
        formData.append("description", documentForm.description);
      }

      const companyRegistrationId = selectedOrder?.company_registration?.id;
      if (!companyRegistrationId) {
        setErr("Şirket kaydı bulunamadı.");
        return;
      }

      await additionalDocumentsApi.upload(token, companyRegistrationId, formData);
      setMsg("Belge başarıyla yüklendi.");
      setDocumentForm({ title: "", description: "", file: null });
      setTimeout(() => {
        setDocumentModalOpen(false);
        setSelectedOrder(null);
        setMsg("");
      }, 1500);
    } catch (e) {
      setErr(e?.message || "Belge yüklenemedi.");
    } finally {
      setUploadingDocument(false);
    }
  };

  const loadCities = async () => {
    setLoadingCities(true);
    try {
      const res = await locationApi.cities();
      const citiesList = res?.data || res || [];
      setCities(Array.isArray(citiesList) ? citiesList : []);
    } catch (e) {
      setCities([]);
    } finally {
      setLoadingCities(false);
    }
  };

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
      setDistricts([]);
    } finally {
      setLoadingDistricts(false);
    }
  };

  useEffect(() => {
    if (form.city_id) {
      loadDistricts(form.city_id);
    } else {
      setDistricts([]);
      setForm(prev => ({ ...prev, district: "", district_id: "" }));
    }
  }, [form.city_id]);

  useEffect(() => {
    if (districts.length > 0 && editing && form.district && !form.district_id) {
      const district = districts.find(d => d.name === form.district);
      if (district) {
        setForm(prev => ({ ...prev, district_id: district.id }));
      }
    }
  }, [districts, editing]);

  const openManageModal = () => {
    setModalOpen(true);
  };

  const openFormModal = async (addr = null) => {
    if (addr) {
      setEditing(addr);
      const cityName = addr.city || "";
      const city = cities.find(c => c.name === cityName || String(c.id) === String(cityName));
      setForm({
        label: addr.label || "",
        name: addr.name || "",
        phone: addr.phone || "",
        address: addr.address || "",
        city: cityName,
        city_id: city?.id || "",
        district: addr.district || "",
        district_id: "",
        country: addr.country || "",
        postal_code: addr.postal_code || "",
        national_id: addr.national_id || "",
        tax_number: addr.tax_number || "",
        is_default: !!addr.is_default,
        is_billing: !!addr.is_billing
      });
      if (city?.id) {
        await loadDistricts(city.id);
      }
    } else {
      setEditing(null);
      setForm({
        label: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        city_id: "",
        district: "",
        district_id: "",
        country: "",
        postal_code: "",
        national_id: "",
        tax_number: "",
        is_default: false,
        is_billing: false
      });
      setDistricts([]);
    }
    setMsg("");
    setErr("");
    setFormModalOpen(true);
  };

  return (
    <div className="min-h-full">
      {/* Tab Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
        <ProfileTabsContent
          tabs={profileTabs}
          active={active}
          setActive={setActive}
          orderSearch={orderSearch}
          setOrderSearch={setOrderSearch}
          filteredOrders={filteredOrders}
          ordersPagination={ordersPagination}
          orders={orders}
          loadingOrders={loadingOrders}
          navigate={navigate}
          openDocumentModal={openDocumentModal}
          loadOrders={loadOrders}
          pendingRegistrations={pendingRegistrations}
          pendingMsg={pendingMsg}
          pendingErr={pendingErr}
          loadingPending={loadingPending}
          documentRequests={documentRequests}
          openPendingDocumentsModal={openPendingDocumentsModal}
          handlePendingAddToCart={handlePendingAddToCart}
          addingPendingId={addingPendingId}
          openDeleteConfirmModal={openDeleteConfirmModal}
          deletingPendingId={deletingPendingId}
          loadingDocumentRequests={loadingDocumentRequests}
          documentRequestsPagination={documentRequestsPagination}
          loadDocumentRequests={loadDocumentRequests}
          invoiceSearch={invoiceSearch}
          setInvoiceSearch={setInvoiceSearch}
          invoiceStatusFilter={invoiceStatusFilter}
          setInvoiceStatusFilter={setInvoiceStatusFilter}
          loadingInvoices={loadingInvoices}
          invoices={invoices}
          invoicesPagination={invoicesPagination}
          loadInvoices={loadInvoices}
          setPdfPreview={setPdfPreview}
          addresses={addresses}
          savedNotice={savedNotice}
          msg={msg}
          err={err}
          setMsg={setMsg}
          setErr={setErr}
          loading={loading}
          openManageModal={openManageModal}
          openFormModal={openFormModal}
          setModalOpen={setModalOpen}
          loadAddresses={loadAddresses}
          getToken={getToken}
          customerApi={customerApi}
          // Accountant Tasks Props
          accountantTasks={accountantTasks}
          loadingAccountantTasks={loadingAccountantTasks}
          accountantTasksError={accountantTasksError}
          accountantTasksPagination={accountantTasksPagination}
          loadAccountantTasks={loadAccountantTasks}
          openAccountantTaskModal={openAccountantTaskModal}
          // Declarations Props
          declarations={declarations}
          loadingDeclarations={loadingDeclarations}
          declarationsError={declarationsError}
          declarationsPagination={declarationsPagination}
          loadDeclarations={loadDeclarations}
          handleViewDeclaration={handleViewDeclaration}
        />
      </div>

      {/* Modals */}
      <AddressManagerModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        addresses={addresses}
        msg={msg}
        err={err}
        setMsg={setMsg}
        setErr={setErr}
        openFormModal={openFormModal}
        getToken={getToken}
        customerApi={customerApi}
        loadAddresses={loadAddresses}
      />

      <AddressFormModal
        formModalOpen={formModalOpen}
        setFormModalOpen={setFormModalOpen}
        editing={editing}
        setEditing={setEditing}
        form={form}
        setForm={setForm}
        cities={cities}
        districts={districts}
        loadingCities={loadingCities}
        loadingDistricts={loadingDistricts}
        loadDistricts={loadDistricts}
        getToken={getToken}
        customerApi={customerApi}
        loadAddresses={loadAddresses}
        setErr={setErr}
        setMsg={setMsg}
        setSavedNotice={setSavedNotice}
        setDistricts={setDistricts}
      />

      <ExtraDocumentModal
        documentModalOpen={documentModalOpen}
        selectedOrder={selectedOrder}
        setDocumentModalOpen={setDocumentModalOpen}
        setSelectedOrder={setSelectedOrder}
        documentForm={documentForm}
        setDocumentForm={setDocumentForm}
        uploadingDocument={uploadingDocument}
        handleDocumentUpload={handleDocumentUpload}
        msg={msg}
        err={err}
        setErr={setErr}
      />

      <PendingDocumentsModal
        pendingDocModalOpen={pendingDocModalOpen}
        pendingDocRegistration={pendingDocRegistration}
        pendingDocLoading={pendingDocLoading}
        pendingDocMsg={pendingDocMsg}
        pendingDocErr={pendingDocErr}
        pendingDocumentDefinitions={pendingDocumentDefinitions}
        pendingDocForm={pendingDocForm}
        closePendingDocumentsModal={closePendingDocumentsModal}
        setPendingSummaryModalOpen={setPendingSummaryModalOpen}
        handlePendingDocumentFile={handlePendingDocumentFile}
        uploadingPendingDocs={uploadingPendingDocs}
        handlePendingDocumentsSave={handlePendingDocumentsSave}
        setPendingDocErr={setPendingDocErr}
      />

      <DeleteConfirmModal
        deleteConfirmModalOpen={deleteConfirmModalOpen}
        pendingToDelete={pendingToDelete}
        closeDeleteConfirmModal={closeDeleteConfirmModal}
        handleDeletePendingRegistration={handleDeletePendingRegistration}
        deletingPendingId={deletingPendingId}
      />

      <PendingSummaryModal
        pendingSummaryModalOpen={pendingSummaryModalOpen}
        pendingDocRegistration={pendingDocRegistration}
        setPendingSummaryModalOpen={setPendingSummaryModalOpen}
        getLabelTR={getLabelTR}
      />

      <AccountantTaskDetailModal
        isOpen={accountantDetailModalOpen}
        onClose={closeAccountantTaskModal}
        taskId={selectedAccountantTaskId}
        refreshTasks={() => loadAccountantTasks(accountantTasksPagination.current_page)}
      />

      <PdfPreviewModal
        pdfPreview={pdfPreview}
        setPdfPreview={setPdfPreview}
        getToken={getToken}
        customerApi={customerApi}
        showToast={showToast}
      />

      <Toast toast={toast} setToast={setToast} />
    </div>
  );
}



