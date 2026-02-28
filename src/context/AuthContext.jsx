import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { customerApi } from "../lib/api";
import { getToken, clearToken } from "../lib/auth";

const AuthContext = createContext({ user: null, loading: false, refresh: async () => {}, logout: async () => {} });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const me = await customerApi.me(token);
      setUser(me?.data || me || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, []);

  const logout = async () => {
    const token = getToken();
    try {
      if (token) await customerApi.logout(token);
    } catch {}
    clearToken();
    setUser(null);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };

  const value = useMemo(() => ({ user, loading, refresh, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}


