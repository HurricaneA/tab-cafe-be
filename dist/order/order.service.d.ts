import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { S3 } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
export declare class OrderService {
    private readonly prismaService;
    private readonly configService;
    private readonly s3Client;
    constructor(prismaService: PrismaService, configService: ConfigService, s3Client: S3);
    generateRandomId(): number;
    create(createOrderDto: CreateOrderDto): Promise<void>;
    findAll(): Promise<any[]>;
    findOne(id: number): string;
    updatedCompletedStatus(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    uploadPDF(file: any, orderId: number): Promise<void | {
        downloadLink: string;
    }>;
}
