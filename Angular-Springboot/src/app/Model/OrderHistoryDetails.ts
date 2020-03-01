import { OrderHistory } from "./OrderHistory";

export interface OrderHistoryDetails {
    status: string;
    message: string;
    AUTH_TOKEN: string;
    orderDetails: Map<number, OrderHistory[]>;
}