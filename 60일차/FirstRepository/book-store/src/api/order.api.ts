import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { requestHandler } from "./http";

// export const order = async (orderData: OrderSheet) => {
//   console.log("주문 데이터 체크!!", orderData);
//   const response = await httpClient.post("/orders", orderData);
//   return response.data;
// };
// 위의 order와 같은 코드! -> http.ts에 정의해놓은 requestHandler 사용
export const order = async (orderData: OrderSheet) => {
  return await requestHandler("post", "/orders", orderData);
};

export const fetchOrders = async () => {
  return await requestHandler("get", "/orders");
};

export const fetchOrder = async (orderId: number) => {
  return await requestHandler("get", `/orders/${orderId}`);
};
