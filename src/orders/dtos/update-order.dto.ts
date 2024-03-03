import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  client: string;

  @Transform(({ value }) => Array.isArray(value) && value.join(', '))
  @IsNotEmpty()
  @IsString()
  address: string;
}
