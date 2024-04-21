export interface User {
  id: string;
  name: string;
}

export interface Session {
  creator: string;
  users: User[];
}

export interface Voting {
  id: string;
  userId: string;
  sessionId: string;
  vote: number;
  createdAt: number;
}
