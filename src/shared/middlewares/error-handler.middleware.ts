import { AxiosError, HttpStatusCode } from 'axios';
import type { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http-exception';

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof HttpException) {
    return response.status(error.statusCode).send({ error: error.message });
  }
  let exception: HttpException;

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || HttpStatusCode.BadRequest;
    const errorMessage = `${error.response?.config.url} - ${error.response?.data}`;
    exception = new HttpException(errorMessage, statusCode);
  }

  return response.status(exception ? exception.statusCode : 500).json({
    message: exception ? exception.message : 'Unknown Error.',
  });
};

export default errorHandler;
