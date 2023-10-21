export declare class ItemsDto {
    name: string;
    quantity: number;
}
export declare class CreateOrderDto {
    items: ItemsDto[];
    total: number;
}
