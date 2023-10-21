import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        orders: import(".prisma/client").Prisma.JsonValue;
        isCompleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    updatedCompletedStatus(id: number): Promise<void>;
    remove(id: number): Promise<void>;
}
