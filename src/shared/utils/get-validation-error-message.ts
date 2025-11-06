import type { ValidationError } from 'class-validator';

export default function getValidationErrorMessages(
  errors: ValidationError[],
): string {
  const errorMessages: string[] = [];
  errors.forEach((error) => {
    if (error.constraints) {
      Object.values(error.constraints).forEach((message) => {
        errorMessages.push(message);
      });
    }
  });

  return errorMessages.join('\n');
}
