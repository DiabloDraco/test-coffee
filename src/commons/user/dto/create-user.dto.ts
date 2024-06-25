import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
  IsArray,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Role } from 'src/commons/role/entities/role.entity';

export class CreateUserDto {
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
