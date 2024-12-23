import { PartialType } from '@nestjs/mapped-types';
import { CreateEnentDto } from './create-event.dto';

export class UpdateEnentDto extends PartialType(CreateEnentDto) {}
