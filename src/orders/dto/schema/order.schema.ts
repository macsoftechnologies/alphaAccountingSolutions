import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class order extends Document{
    @Prop({required : true , unique:true , default : uuid})
    Order_id: string
    @Prop({required : true})
    UserId: string
    @Prop({required : true})
    ProductId:string
    CreatedDate: Date
    @Prop({required : true})
    UpdatedDate : string
    @Prop({required : true})
    OrderedPrice : string
    @Prop({default: "pending"})
    status:string
    Name:string
    Age:number
    MobileNum:number
    @IsEmail()
    Email:string
}
export const  OrderSchema = SchemaFactory.createForClass(order);