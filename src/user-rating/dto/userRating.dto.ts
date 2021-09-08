import { IsNotEmpty } from 'class-validator';
export class userRatingDto{
    @IsNotEmpty()
    Productid:string
    @IsNotEmpty()
    Userid:string
    Rating : number
    Comments : string
 }