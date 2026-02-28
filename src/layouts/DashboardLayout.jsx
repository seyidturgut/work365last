import { useState } from "react";
import { Outlet } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import SEO from "../components/SEO";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <CartProvider>
            <SEO useRouteMeta={false} noindex />
            <div className="min-h-screen bg-gray-50 flex">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <DashboardSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
                    {/* Header */}
                    <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </CartProvider>
    );
};

export default DashboardLayout;
