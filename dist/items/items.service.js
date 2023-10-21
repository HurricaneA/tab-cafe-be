"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ItemsService = class ItemsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createItemDto) {
        try {
            await this.prismaService.item.create({
                data: {
                    name: createItemDto.name,
                    price: createItemDto.price,
                    isAvailable: createItemDto.isAvailable,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot create!');
        }
    }
    async findAll() {
        try {
            const items = await this.prismaService.item.findMany({});
            return items;
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot fetch!');
        }
    }
    findOne(id) {
        return `This action returns a #${id} item`;
    }
    async update(id, updateItemDto) {
        try {
            await this.prismaService.item.update({
                where: {
                    id,
                },
                data: {
                    name: updateItemDto.name,
                    price: updateItemDto.price,
                    isAvailable: updateItemDto.isAvailable,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot Update!');
        }
    }
    async remove(id) {
        try {
            await this.prismaService.item.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot remove!');
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItemsService);
//# sourceMappingURL=items.service.js.map