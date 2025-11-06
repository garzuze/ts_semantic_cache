import { HttpStatusCode } from 'axios';
import HttpException from './http-exception';

class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatusCode.BadRequest);
  }
}

export default BadRequestException;
