import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/commons/role/entities/role.entity';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @MinLength(4)
  readonly login: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    isArray: true,
    type: Role,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Role)
  readonly roles: Role[];
}
