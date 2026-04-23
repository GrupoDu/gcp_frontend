export interface User {
  user_uuid: string;
  email: string;
  name: string;
  user_role: string;
  password?: string;
}

export interface UserPublic extends Omit<User, "password" | "email"> {
  email?: string;
}
