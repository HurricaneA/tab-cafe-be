import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        order: import(".prisma/client").Prisma.JsonValue;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): Promise<void>;
}
