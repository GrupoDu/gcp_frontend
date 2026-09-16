export interface User {
  uuid: string;
  email: string;
  name: string;
  role: string;
  password?: string;
}

export interface UserPublic extends Omit<User, "password" | "email"> {
  email?: string;
}
