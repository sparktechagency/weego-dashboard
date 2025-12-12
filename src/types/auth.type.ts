interface IJwtPayload {
  _id: string;
  fullName: string;
  email: string;
  currentRole: string;
  image: string;
  role: string[];
  isComplete: boolean;
  isLoginToken: boolean;
  adminRole: string; // added
  categoryPermissions: string[]; // added
  iat: number; // issued at
  exp: number; // expiry time
}

export type { IJwtPayload };
