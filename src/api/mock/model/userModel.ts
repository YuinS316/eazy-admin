export interface UserInfo {
  name: string;
  id: string;
  email: string;
  role: string;
}

export interface LoginBody {
  account: string;
  password: string;
}
