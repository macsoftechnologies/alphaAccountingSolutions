import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from 'src/users/schema/user.schema';
import { AdminService } from './admin.service';
import { admin, adminSchema } from './schema/admin.schema';



@Module({
  imports:[MongooseModule.forFeature([{name :admin.name , schema : adminSchema}]),
  MongooseModule.forFeature([{name :Users.name , schema : UsersSchema}]),
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
