interface IProvider {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  contact1: string;
  contact2: string;
  image: string;
  role: string[];
  coverageArea: string[];
  language: string;
  isBan: boolean;
  rating: number;
  orderCompleted: number;
  orderCanceled: number;
  createdAt: string;
}
interface IContractor {
  _id: string;
  fullName?: string;
  email: string;
  phoneNumber: string;
  gender: string;
  contact1: string;
  contact2: string;
  image: string;
  role: string[];
  coverageArea: string[];
  language?: string;
  isBan?: boolean;
  rating?: number;
  orderCompleted?: number;
  orderCanceled?: number;
  createdAt: string;
  dob?: string;
}

interface IDeletedUser {
  _id: string;
  youliveIn: string;
  role: string;
  reason: string;
  createdAt: string;
  fullName: string;
}
export type { IProvider, IContractor, IDeletedUser };
