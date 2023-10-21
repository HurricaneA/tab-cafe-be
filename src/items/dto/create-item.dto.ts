import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}
