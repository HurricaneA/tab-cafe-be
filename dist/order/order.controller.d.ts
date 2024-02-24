import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<void>;
    findAll(): Promise<any[]>;
    findOne(id: string): string;
    uploadPDF(file: any, body: {
        orderId: string;
    }): Promise<void | {
        downloadLink: string;
    }>;
    update(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
