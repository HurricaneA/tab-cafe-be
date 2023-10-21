import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ItemsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
