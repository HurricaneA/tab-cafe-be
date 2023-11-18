import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { InjectS3, S3 } from 'nestjs-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @InjectS3() private readonly s3Client: S3,
  ) {}

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
      const orders = await this.prismaService.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      const refactoredOrders = [];

      orders.forEach((order) => {
        let total = 0;

        const orderList = (
          order.orders as {
            name: string;
            quantity: number;
            unitPrice: number;
          }[]
        ).map((item) => {
          const subTotal = item.quantity * item.unitPrice;
          total = total + subTotal;
          return {
            ...item,
            subTotal: subTotal,
          };
        });

        order.orders = orderList;
        order['total'] = total;
        refactoredOrders.push(order);
      });

      return refactoredOrders;
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

  async uploadPDF(file: any, orderId: number) {
    console.log(file);
    return await this.s3Client
      .send(
        new PutObjectCommand({
          Body: file.buffer,
          ACL: 'public-read',
          Bucket: this.configService.get<string>('S3_BUCKET'),
          Key: file.originalname,
          ContentEncoding: 'base64',
          ContentType: `application/pdf`,
        }),
      )
      .then(async () => {
        const receiptLink = `${this.configService.get<string>(
          'S3_API_URL',
        )}/tabcafe/${file.originalname}`;
        const isUpdated = await this.prismaService.order.update({
          where: {
            id: orderId,
          },
          data: {
            receiptLink: receiptLink,
          },
        });

        return {
          downloadLink: isUpdated.receiptLink,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
