import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class userRating extends Document{
    @Prop({required : true })
    Productid: string
    @Prop({required : true})
    Userid: string
    @Prop()
    Rating : string
    @Prop()
    Comments : string
    
}
export const  userRatingSchema = SchemaFactory.createForClass(userRating);