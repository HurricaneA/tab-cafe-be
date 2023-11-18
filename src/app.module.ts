import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OrderModule } from './order/order.module';
import { S3Module } from 'nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    S3Module.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get<string>('S3_ACCESS_KEY'),
            secretAccessKey: configService.get<string>('S3_SECRET_KEY'),
          },
          endpoint: configService.get<string>('S3_API_URL'),
          region: 'eu-north-1',
          forcePathStyle: true,
          signatureVersion: 'v4',
        },
      }),
      inject: [ConfigService],
    }),
    ItemsModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
