import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell } from "react-icons/fa";
import { notificationApi } from "../lib/api";
import { getToken } from "../lib/auth";
import { useAuth } from "../context/AuthContext";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBadge({ white }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const badgeRef = useRef(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchNotificationCount();

    const interval = setInterval(fetchNotificationCount, 30000);

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (badgeRef.current && !badgeRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const fetchNotificationCount = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await notificationApi.count(token);
      if (response) {
        setCount(response.total_unread || 0);
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Notification count error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) return null;

  return (
    <div className="relative" ref={badgeRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`relative p-2 transition-colors ${white ? "text-white hover:text-white/80" : "text-gray-600 hover:text-gray-900"}`}
        aria-label="Bildirimler"
      >
        <FaBell className="h-6 w-6" />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <NotificationDropdown
            isOpen={dropdownOpen}
            onClose={() => setDropdownOpen(false)}
            onNavigate={(path) => {
              setDropdownOpen(false);
              navigate(path);
            }}
            onReadChange={fetchNotificationCount}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

