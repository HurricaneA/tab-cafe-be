import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        orders: import(".prisma/client").Prisma.JsonValue;
        isCompleted: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): string;
    update(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
