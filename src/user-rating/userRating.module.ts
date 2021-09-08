import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRatingService } from './user-rating.service';
import { UserRatingController } from './user-rating.controller';
import { userRating, userRatingSchema } from './schema/userRating .schema';


@Module({
  imports:[MongooseModule.forFeature([{name :userRating.name , schema : userRatingSchema}]),
  ],
  providers: [UserRatingService],
  controllers: [UserRatingController]
})
export class userRatingModule {}