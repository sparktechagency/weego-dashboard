interface IJwtPayload {
  _id: string;
  fullName: string;
  email: string;
  currentRole: string;
  image: string;
  role: string[];
  isComplete: boolean;
  isLoginToken: boolean;
  iat: number; // issued at (token issue time)
  exp: number; // expiry time
}

export type { IJwtPayload };
