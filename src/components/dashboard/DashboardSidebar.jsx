import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    FaShoppingBag,
    FaClipboardList,
    FaFileAlt,
    FaWallet,
    FaMapMarkerAlt,
    FaCalculator,
    FaFileContract,
    FaShieldAlt,
    FaSignOutAlt,
    FaTimes,
    FaHome,
    FaBell,
} from "react-icons/fa";

const navItems = [
    {
        key: "orders",
        label: "Siparişler",
        icon: FaShoppingBag,
        tab: "orders",
    },
    {
        key: "pending",
        label: "Taslak Başvurular",
        icon: FaClipboardList,
        tab: "pending",
    },
    {
        key: "document-requests",
        label: "Belge Talepleri",
        icon: FaFileAlt,
        tab: "document-requests",
    },
    {
        key: "invoices",
        label: "Faturalar",
        icon: FaWallet,
        tab: "invoices",
    },
    {
        key: "addresses",
        label: "Adresler",
        icon: FaMapMarkerAlt,
        tab: "addresses",
    },
    {
        key: "accountant-tasks",
        label: "Muhasebe Görevleri",
        icon: FaCalculator,
        tab: "accountant-tasks",
    },
    {
        key: "declarations",
        label: "Beyannameler",
        icon: FaFileContract,
        tab: "declarations",
    },
    {
        key: "notifications",
        label: "Bildirimler",
        icon: FaBell,
        tab: "notifications",
    },
];

const bottomNavItems = [
    {
        key: "security",
        label: "Güvenlik",
        icon: FaShieldAlt,
        tab: "security",
    },
];

export default function DashboardSidebar({ isOpen, onClose }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleTabClick = (tab) => {
        navigate(`/profil/detay?tab=${tab}`);
        onClose();
    };

    return (
        <aside
            className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#799b38] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">W</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Work365</h1>
                        <p className="text-xs text-gray-400">Hesabım</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <FaTimes className="w-5 h-5" />
                </button>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <img
                        src={
                            user?.avatar_url ||
                            `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                                user?.name || "Kullanıcı"
                            )}`
                        }
                        alt={user?.name}
                        className="w-10 h-10 rounded-full bg-gray-700 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user?.name || "Kullanıcı"}</p>
                        <p className="text-xs text-gray-400 truncate">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
                {/* Home Link */}
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                >
                    <FaHome className="w-5 h-5" />
                    <span>Ana Sayfa</span>
                </NavLink>

                <div className="pt-2 pb-1">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Hesap
                    </p>
                </div>

                {navItems.map((item) => {
                    const searchParams = new URLSearchParams(window.location.search);
                    const currentTab = searchParams.get("tab") || "orders";
                    const isActive = currentTab === item.tab;

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleTabClick(item.tab)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
                ${isActive
                                    ? "bg-[#799b38]/10 text-[#799b38] font-medium"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
              `}
                        >
                            <item.icon
                                className={`w-5 h-5 ${isActive ? "text-[#799b38]" : ""}`}
                            />
                            <span>{item.label}</span>
                        </button>
                    );
                })}

                <div className="pt-4 pb-1">
                    <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Ayarlar
                    </p>
                </div>

                {bottomNavItems.map((item) => {
                    const searchParams = new URLSearchParams(window.location.search);
                    const currentTab = searchParams.get("tab") || "orders";
                    const isActive = currentTab === item.tab;

                    return (
                        <button
                            key={item.key}
                            onClick={() => handleTabClick(item.tab)}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left
                ${isActive
                                    ? "bg-[#799b38]/10 text-[#799b38] font-medium"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }
              `}
                        >
                            <item.icon
                                className={`w-5 h-5 ${isActive ? "text-[#799b38]" : ""}`}
                            />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600/20 transition-colors"
                >
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
}
