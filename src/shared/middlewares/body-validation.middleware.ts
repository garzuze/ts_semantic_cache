import { plainToClass } from 'class-transformer';
import { type ValidationError, validate } from 'class-validator';
import type { NextFunction, Request, Response } from 'express';
import BadRequestException from '../exceptions/bad-request.exception';
import getValidationErrorMessages from '../utils/get-validation-error-message';

function validateBody<T extends object>(dtoClass: new () => T) {
  return async (request: Request, _response: Response, next: NextFunction) => {
    if (
      request.body === undefined ||
      request.body === null ||
      Object.keys(request.body).length === 0
    ) {
      throw new BadRequestException(
        'You must send a paremeter in the request body.',
      );
    }
    const tObj = plainToClass(dtoClass, request.body);

    const errors: ValidationError[] = await validate(tObj);
    if (errors.length > 0) {
      const messages = getValidationErrorMessages(errors);
      throw new BadRequestException(messages);
    }

    request.body = tObj;
    next();
  };
}

export default validateBody;
