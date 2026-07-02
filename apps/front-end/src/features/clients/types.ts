export interface Client {
  id: string;
  name: string;
  salary: number;
  companyValue: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientInput {
  name: string;
  salary: number;
  companyValue: number;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ClientStats {
  total: number;
  recent: Client[];
  perDay: { date: string; count: number }[];
}
