import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Validator that checks if a given string is empty or has an empty character
@ValidatorConstraint({ name: 'isNotBlank', async: false })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  // biome-ignore lint/suspicious/noExplicitAny: <must be any>
  validate(value: any, _args: ValidationArguments) {
    return (
      typeof value === 'string' &&
      value.trim().length > 0 &&
      !value.trim().includes('‎ ')
    );
  }

  defaultMessage(args: ValidationArguments) {
    return `'${args.property}' must not be empty.`;
  }
}

export function isNotBlank(validationOptions?: ValidationOptions) {
  // biome-ignore lint/complexity/noBannedTypes: <must be any>
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}
