import { IsNotEmpty, IsString, Length, IsInt, Min } from 'class-validator';

export class CreateProductDTO {
  @Length(10, 20)
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
