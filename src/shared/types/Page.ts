export interface Pageable {
    page: number,
    size: number,
    sort?: string[]
}

export interface BackendPage<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
}