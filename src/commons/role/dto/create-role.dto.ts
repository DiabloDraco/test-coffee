import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  readonly description: string;
}
