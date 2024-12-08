export type FetchRequestType = {
  params?: Record<string, string | number>;
  headers?: Record<string, string>;
};

export enum HttpStatus {
  OK = "OK",
  NOT_FOUND = "NOT_FOUND",
}
