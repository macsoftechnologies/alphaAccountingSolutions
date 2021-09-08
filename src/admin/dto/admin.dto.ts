import { IsNotEmpty } from 'class-validator';
export class productRegister{
    @IsNotEmpty()
    Product_id:string
    @IsNotEmpty()
    Name_of_the_product :string
    Description : string
    @IsNotEmpty()
    Price : string
    @IsNotEmpty()
    Discount : number
    Documents_required : string 
    
}
export class productUpdate{
    @IsNotEmpty()
    Product_id:string
    @IsNotEmpty()
    Name_of_the_product :string
    Description : string
    @IsNotEmpty()
    Price : string
    @IsNotEmpty()
    Discount : number
    Documents_required : string 
    
}
export class productStatus{
    Product_id:string
    status:string
}