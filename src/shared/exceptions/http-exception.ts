import { HttpStatusCode } from 'axios';

export default class HttpException extends Error {
  public readonly statusCode: number;
  constructor(message: string, statusCode = HttpStatusCode.BadRequest) {
    super(message);
    Object.setPrototypeOf(this, HttpException.prototype);
    this.statusCode = statusCode;
  }
}
