import { useState, useMemo, useCallback } from "react";

export default function useOrders({ getToken, ordersApi }) {
  const [orders, setOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersPagination, setOrdersPagination] = useState({
    current_page: 1,
    per_page: 5,
    total: 0,
    last_page: 1,
    from: 0,
    to: 0,
  });

  const loadOrders = useCallback(
    async (page = 1) => {
      const token = getToken();
      if (!token) return;
      setLoadingOrders(true);
      try {
        const res = await ordersApi.list(token, page, 5);
        const list = res?.data || res || [];
        setOrders(Array.isArray(list) ? list : []);
        if (res?.pagination) {
          setOrdersPagination(res.pagination);
        }
      } catch (e) {
        setOrders([]);
        setOrdersPagination({
          current_page: 1,
          per_page: 5,
          total: 0,
          last_page: 1,
          from: 0,
          to: 0,
        });
      } finally {
        setLoadingOrders(false);
      }
    },
    [getToken, ordersApi]
  );

  const filteredOrders = useMemo(() => {
    const query = orderSearch.trim().toLowerCase();
    if (!query) return orders;

    return orders.filter((order) => {
      const company = order.company_registration;
      const items = Array.isArray(order.items) ? order.items : [];

      const matchesId = String(order.id).includes(query);
      const matchesStatus = order.status?.toLowerCase().includes(query);
      const matchesCompanyName = company?.company_name?.toLowerCase().includes(query);
      const matchesProductTitle = company?.product_title?.toLowerCase().includes(query);
      const matchesTier = company?.tier?.toLowerCase().includes(query);
      const matchesPeriod = company?.period?.toLowerCase().includes(query);
      const matchesItem = items.some((item) => item.name?.toLowerCase().includes(query));

      return matchesId || matchesStatus || matchesCompanyName || matchesProductTitle || matchesTier || matchesPeriod || matchesItem;
    });
  }, [orders, orderSearch]);

  return {
    orders,
    orderSearch,
    setOrderSearch,
    loadingOrders,
    ordersPagination,
    loadOrders,
    filteredOrders,
  };
}

