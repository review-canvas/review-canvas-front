export interface Sort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
  descending: boolean;
}

export interface Page<T> {
  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort[];
}

export interface OrderRequest {
  property?: string;
  direction?: string;
}

export type PageRequest<T extends object> = OrderRequest &
  T & {
    page?: number;
    size?: number;
  };
