import { useEffect, useState } from "react";
import { Order, OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSeletedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    // 요청 방어
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSeletedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      setSeletedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: [orderDetail],
            };
          }
          return item;
        }),
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
