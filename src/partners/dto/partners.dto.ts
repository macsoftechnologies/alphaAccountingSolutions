import { IsString, IsEmail, IsOptional, IsNumber, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class partnersRegistration{
    @ApiProperty()
    @IsNotEmpty()
    UserId : string
    ProductId: string
    Partners:[{
    Name:string,
    Age:number,
    MobileNum:number,
    Email:string
    },
    {Name:string,
        Age:number,
        MobileNum:number,
        Email:string,
    }]
    }
export class updatePartner{
    @ApiProperty()
    @IsNotEmpty()
    UserId : string

    @ApiProperty()
    @IsNotEmpty()
    ProductId: string
    @IsArray()
    Partners:partners[]
}
 export class partners
 {  Name:string
    Age:number
    MobileNum:number
    Email:string
 }