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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const nestjs_s3_1 = require("nestjs-s3");
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("@nestjs/config");
let OrderService = class OrderService {
    constructor(prismaService, configService, s3Client) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.s3Client = s3Client;
    }
    generateRandomId() {
        return Math.floor(Math.random() * Date.now());
    }
    async create(createOrderDto) {
        try {
            const randomId = this.generateRandomId();
            await this.prismaService.order.create({
                data: {
                    orders: createOrderDto.items,
                    randomId: randomId.toString(),
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot place order!');
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
                const orderList = order.orders.map((item) => {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot fetch orders!');
        }
    }
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    async updatedCompletedStatus(id) {
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
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot update status!');
        }
    }
    async remove(id) {
        try {
            await this.prismaService.order.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error, 'Cannot delete orders!');
        }
    }
    async uploadPDF(file, orderId) {
        return await this.s3Client
            .send(new client_s3_1.PutObjectCommand({
            Body: file.buffer,
            ACL: 'public-read',
            Bucket: this.configService.get('S3_BUCKET'),
            Key: file.originalname,
            ContentEncoding: 'base64',
            ContentType: `application/pdf`,
        }))
            .then(async () => {
            const receiptLink = `${this.configService.get('S3_API_URL')}/tabcafe/${file.originalname}`;
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
            console.log('error is', err);
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_s3_1.InjectS3)()),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map