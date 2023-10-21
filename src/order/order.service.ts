import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      await this.prismaService.order.create({
        data: {
          order: createOrderDto.items as any,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot place order!');
    }
  }

  async findAll() {
    try {
      const orders = await this.prismaService.order.findMany({});

      return orders;
    } catch (error) {
      throw new BadRequestException(error, 'Cannot fetch orders!');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    try {
      await this.prismaService.order.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot delete orders!');
    }
  }
}
