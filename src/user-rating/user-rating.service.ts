import { Injectable, Post, HttpStatus, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userRatingDto } from './dto/userRating.dto';
import { userRating } from './schema/userRating .schema';

@Injectable()
export class UserRatingService {
  
    constructor(@InjectModel(userRating.name) private partnersModel: Model<userRating>) { }
   
    async ratingResponse(req: userRatingDto) {
        try {
            const ratingRes = await this.partnersModel.create(req)
            if (ratingRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Users rating response",
                    data: {
                        UserRatingResponse: {
                            Userid: ratingRes.Userid,
                            Product_id: ratingRes.Productid,
                            Rating: ratingRes.Rating
                            
                        }
                    }
                }

            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }

        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

}
