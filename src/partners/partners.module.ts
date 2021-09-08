import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { partners, PartnersSchema } from './schema/partners.schema';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';


@Module({
  imports:[MongooseModule.forFeature([{name :partners.name , schema : PartnersSchema}]),
  ],
  providers: [PartnersService],
  controllers: [PartnersController]
})
export class PartnersModule {}