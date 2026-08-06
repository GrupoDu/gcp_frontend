export interface User {
  userUuid: string;
  email: string;
  name: string;
  userRole: string;
  password?: string;
}

export interface UserPublic extends Omit<User, "password" | "email"> {
  email?: string;
}
