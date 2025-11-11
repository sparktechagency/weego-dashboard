interface IService {
  _id: string;
  serviceName: string;
  description: string;
  haveTools: boolean;
  needTools: string[];
  estimatedTimeMin: number;
  estimatedTimeMax: number;
  price: number;
  rating: number;
  image: string;
  categoryName: string;
  providerName: string;
  serviceId: string;
}

export type { IService };
