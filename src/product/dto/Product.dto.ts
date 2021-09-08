import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
export class productRegister{
    Product_id:string
    Name_of_the_product :string
    Description : string
    Price : string
    Discount : number
    Documents_required : string 
    
}

export class updateProduct{
    Name_of_the_product:string
    Product_id:string
    Description : string
    Price : string
    Discount : number
    Documents_required : string
}

export class DeleteProduct{
    DeleteType : string
    Product_id:string
    }

export class ProductId{
    Product_id: string
}