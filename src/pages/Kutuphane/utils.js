import * as FaIcons from "react-icons/fa";
import { API_BASE_URL } from "../../lib/api";
import { FaBook } from "react-icons/fa";

export const getIconComponent = (name) => {
  if (!name) return FaBook;
  return FaIcons[name] || FaBook;
};

export const resolveApiLink = (link) => {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  return `${API_BASE_URL.replace(/\/$/, "")}${link}`;
};

