import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(createItemDto: CreateItemDto): Promise<void>;
    findAll(): Promise<{
        id: number;
        name: string;
        type: string;
        price: number;
        isAvailable: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): string;
    update(id: string, updateItemDto: UpdateItemDto): Promise<void>;
    remove(id: string): Promise<void>;
}
