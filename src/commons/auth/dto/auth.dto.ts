import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
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
  @MinLength(6)
  readonly password: string;
}
