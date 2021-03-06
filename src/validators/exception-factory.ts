import { HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ResponseCode } from '../common/response-code.enum';
import { CustomException } from '../exceptions/custom.exception';

export function ExceptionFactory(errors: ValidationError[]) {
  const messages: string[] = [];
  errors.forEach((error) => {
    Object.keys(error.constraints).forEach((key) => messages.push(error.constraints[key]));
  });
  throw new CustomException({
    status: HttpStatus.BAD_REQUEST,
    data: {
      code: ResponseCode.BAD_REQUEST,
      message: messages[0]
    },
    log: {
      data: errors[0].target
    }
  });
}
