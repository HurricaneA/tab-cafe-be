"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const items_module_1 = require("./items/items.module");
const order_module_1 = require("./order/order.module");
const nestjs_s3_1 = require("nestjs-s3");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_s3_1.S3Module.forRootAsync({
                imports: [],
                useFactory: (configService) => ({
                    config: {
                        credentials: {
                            accessKeyId: configService.get('S3_ACCESS_KEY'),
                            secretAccessKey: configService.get('S3_SECRET_KEY'),
                        },
                        endpoint: configService.get('S3_API_URL'),
                        region: 'eu-north-1',
                        forcePathStyle: true,
                        signatureVersion: 'v4',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            items_module_1.ItemsModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map