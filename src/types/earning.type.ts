export interface IEarning {
  _id: string;
  amount: number; // transaction amount
  stripeTransferId: string; // Stripe transfer ID
  type: "commission" | "payment" | "refund"; // type of transaction
  createdAt: string; // ISO date string
  userName: string;
  userEmail: string;
  serviceserviceName: string; // name of the service
}
export interface ITransaction {
  _id: string;
  amount: number;
  stripeTransferId: string;
  type: "commission" | "payment" | "refund" | "payout"; // added 'payout'
  createdAt: string; // ISO string
  userName: string;
  userEmail: string;
  serviceserviceName: string;
}
