import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createItemDto: CreateItemDto) {
    try {
      await this.prismaService.item.create({
        data: {
          name: createItemDto.name,
          price: createItemDto.price,
          isAvailable: createItemDto.isAvailable,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot create!');
    }
  }

  async findAll() {
    try {
      const items = await this.prismaService.item.findMany({});

      return items;
    } catch (error) {
      throw new BadRequestException(error, 'Cannot fetch!');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    try {
      await this.prismaService.item.update({
        where: {
          id,
        },
        data: {
          name: updateItemDto.name,
          price: updateItemDto.price,
          isAvailable: updateItemDto.isAvailable,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot Update!');
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.item.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot remove!');
    }
  }
}
