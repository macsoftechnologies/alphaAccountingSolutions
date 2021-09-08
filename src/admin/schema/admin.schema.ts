import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class admin extends Document{
    @Prop({required : true , unique:true , default : uuid})
    Product_id: string
    @Prop({required : true})
    Name_of_the_product: string
    @Prop({required : true})
    Description : string
    @Prop({required : true})
    Price : string
    @Prop({required: true})
    Discount : number
    @Prop({required : true})
    Documents_required : string
    @Prop({ default: false })
    @IsOptional()
    isDeleted?: boolean;
    @Prop({default: "Active"})
    status:string
}
export const  adminSchema = SchemaFactory.createForClass(admin);