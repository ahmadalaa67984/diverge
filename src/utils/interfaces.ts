export interface FilterOption {
  title: string;
  value: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string;
  profileImage: string;
  createdAt: string;
  status: string;
}
