export type IAuthUser = {
  email: string;
  role: string;
  id: string;
  iat: number;
  exp: number;
} | null;
