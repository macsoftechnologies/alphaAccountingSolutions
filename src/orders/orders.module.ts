import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { order, OrderSchema } from './dto/schema/order.schema';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';


@Module({
  imports:[MongooseModule.forFeature([{name :order.name , schema : OrderSchema}]),
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}