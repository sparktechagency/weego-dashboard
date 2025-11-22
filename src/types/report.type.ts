interface IReport {
  _id: string;
  option: string;
  comment: string;
  image: string[];
  createdAt: string;
  reporterName: string;
  reporterEmail: string;
  reporterRole?: string;
  targetUserName: string;
  targetUserEmail: string;
  targetUserRole?: string;
  isSolved?: boolean;
}
export interface IAppReport {
  _id: string;
  comment: string;
  image: string[]; // Array of image URLs
  isSolved: boolean;
  createdAt: string; // ISO string
  reporterName: string;
  reporterEmail: string;
  reporterImage: string; // URL of reporter's image
}

export interface IImprovementSuggestion {
  _id: string;
  comment: string;
  image: string[]; // Array of image URLs
  isSolved: boolean;
  createdAt: string; // ISO string
  senderName: string;
  senderEmail: string;
  senderImage: string; // URL of sender's image
}
export type { IReport };
