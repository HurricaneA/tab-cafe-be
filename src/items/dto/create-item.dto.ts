import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  type: string;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;
}
