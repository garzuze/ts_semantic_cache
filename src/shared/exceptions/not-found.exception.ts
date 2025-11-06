import { HttpStatusCode } from 'axios';
import HttpException from './http-exception';

class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatusCode.NotFound);
  }
}

export default NotFoundException;
  