export interface User {
  id: string;
  name: string;
}

export interface Session {
  creator: string;
  users: User[]
}
