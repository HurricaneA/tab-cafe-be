import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma.service';
export declare class ItemsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createItemDto: CreateItemDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        name: string;
        price: number;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): string;
    update(id: number, updateItemDto: UpdateItemDto): Promise<void>;
    remove(id: number): Promise<void>;
}
