interface IBooking {
  _id: string;
  total: number;
  date: string;
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled";
  createdAt: string;
  bId: string;
  addressDetails: {
    _id: string;
    user: string;
    fullAddress: string;
    street: string;
    exterior: string;
    interior: string;
    zipCode: string;
    instructions: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  categoryName: string;
  contractorName: string;
  contractorEmail: string;
  contractorcontact1: string;
  contractorcontact2: string;
  providerName: string;
  providerEmail: string;
  providercontact1: string;
  providercontact2: string;
  options?: string;
  cancelationReason?: string;
  canceledBy?: string;
}

export type { IBooking };
