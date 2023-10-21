import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ItemsDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmptyObject()
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => ItemsDto)
  items: ItemsDto[];

  @IsNumber()
  total: number;
}
