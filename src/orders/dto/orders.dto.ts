import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
export class productOrder{
    Order_id:string
    UserId:string
    ProductId:string
    @Type(() => Date)
    @IsDate()
    CreatedDate: Date;
    @Type(() => Date)
    @IsDate()
    UpdatedDate: Date; 
    OrderedPrice : string
}

export class orderStatus{
    Order_id:string
    status:string
}
