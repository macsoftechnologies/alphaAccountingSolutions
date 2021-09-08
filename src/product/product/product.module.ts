import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { product, ProductSchema } from '../schema/product.schema';
import { ProductController } from '../product.controller';
import { ProductService } from './product.service';


@Module({
  imports:[MongooseModule.forFeature([{name :product.name , schema : ProductSchema}]),
  ],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}