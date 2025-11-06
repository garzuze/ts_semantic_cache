import { IsString, Length } from 'class-validator';
import { isNotBlank } from '../../../shared/utils/is-not-blank.validator';

export class PromptDto {
  @IsString({ message: 'Prompt must be a string.' })
  @Length(10, 512, {
    message: 'Prompt must be between 10 and 512 characters.',
  })
  @isNotBlank({ message: 'Prompt must not be empty.' })
  prompt: string;
}
