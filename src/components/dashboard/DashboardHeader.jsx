import { useSearchParams } from "react-router-dom";
import { FaBars, FaChevronRight } from "react-icons/fa";

const tabLabels = {
    orders: "Siparişler",
    pending: "Taslak Başvurular",
    "document-requests": "Belge Talepleri",
    "service-requests": "Hizmet Talepleri",
    invoices: "Faturalar",
    addresses: "Adresler",
    "accountant-tasks": "Muhasebe Görevleri",
    declarations: "Beyannameler",
    notifications: "Bildirimler",
    security: "Güvenlik",
};

export default function DashboardHeader({ onMenuToggle }) {
    const [searchParams] = useSearchParams();
    const currentTab = searchParams.get("tab") || "orders";
    const currentLabel = tabLabels[currentTab] || "Profil Detayları";

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center px-4 py-3 md:px-6">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors mr-4"
                >
                    <FaBars className="w-5 h-5 text-gray-600" />
                </button>

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm">
                    <span className="text-gray-500">Hesabım</span>
                    <FaChevronRight className="w-3 h-3 mx-2 text-gray-400" />
                    <span className="font-medium text-gray-900">{currentLabel}</span>
                </nav>
            </div>
        </header>
    );
}
