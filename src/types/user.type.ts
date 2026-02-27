export interface User {
  user_id: string;
  email: string;
  name: string;
  user_type: string;
  password?: string;
}

export interface UserPublic extends Omit<User, "password" | "email"> {
  email?: string;
}
