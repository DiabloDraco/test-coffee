import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/commons/user/entities/user.entity';

export class CreateOrderDto {
  @ApiProperty({
    description: 'user of Order',
    type: String,
  })
  @IsNotEmpty()
  @Type(() => User)
  user: User;
}
