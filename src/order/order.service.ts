import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  generateRandomId() {
    return Math.floor(Math.random() * Date.now());
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const randomId = this.generateRandomId();
      await this.prismaService.order.create({
        data: {
          orders: createOrderDto.items as any,
          randomId: randomId.toString(),
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

  async updatedCompletedStatus(id: number) {
    try {
      const order = await this.prismaService.order.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          isCompleted: true,
        },
      });

      await this.prismaService.order.update({
        where: {
          id,
        },
        data: {
          isCompleted: !order.isCompleted,
        },
      });
    } catch (error) {
      throw new BadRequestException(error, 'Cannot update status!');
    }
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
