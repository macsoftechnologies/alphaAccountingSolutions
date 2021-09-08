import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { userRatingDto } from './dto/userRating.dto';
import { UserRatingService } from './user-rating.service';

@Controller('user-rating')
export class UserRatingController {
        constructor(private userRatingService: UserRatingService) { }
        
        @Post('/register')
        async create(@Body() req: userRatingDto) {
            try {
                const result = await this.userRatingService.ratingResponse(req)
                console.log("result", result);
                
                return result
            } catch (error) {
                return {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error.message,
                };
            }
    
        }
}
