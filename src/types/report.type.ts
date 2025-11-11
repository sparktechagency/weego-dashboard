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

export type { IReport };
