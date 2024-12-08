import { HttpStatus } from "types/http.types";

export const HttpStatusCodes: Partial<Record<HttpStatus, number>> = {
  [HttpStatus.OK]: 200,
  [HttpStatus.NOT_FOUND]: 404,
};
