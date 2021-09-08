import { HttpStatus, Injectable } from '@nestjs/common';
import { product } from '../schema/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteProduct, productRegister, updateProduct } from '../dto/Product.dto';

@Injectable()
export class ProductService {
    
    constructor(@InjectModel(product.name) private productModel: Model<product>) { }
     async Create(req: productRegister, documents) {
        try {

            console.log(req, "documents...", documents)
             if (documents) {
                const reqDoc = documents.map((doc, index) => {
                    let IsPrimary = false
                    if (index == 0) {
                        IsPrimary = true
                    }
                    const randomNumber = Math.floor((Math.random() * 1000000) + 1);
                    return doc.filename
                    
                })

                req.Documents_required = reqDoc.toString()
            }
               console.log(req);
            // return false;
           const registerRes = await this.productModel.create(req)
           
             if (registerRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        UserRegistration: {
                            Name_of_the_product: registerRes.Name_of_the_product,
                            Description: registerRes.Description,
                            Price: registerRes.Price
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
      async updateProduct(body: updateProduct) {
        try {
            // console.log(body, "body............")
            const updateRes = await this.productModel.updateOne({ Product_id: body.Product_id }, { $set: { Name_of_the_product: body.Name_of_the_product, Description: body.Description, Price: body.Price, Discount: body.Discount, Documents_required: body.Documents_required } })
            // console.log(updateRes, "update,,res")
            if (updateRes.nModified == 1) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: "Product updated successFully"
                }
            }
            return {
                StatusCode: HttpStatus.BAD_REQUEST,
                Message: "Product updation Failed"
            }
        } catch (error) {
            return {
                StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: error.message
            }
        }
    }
  
    async delete(body: DeleteProduct) {
        try {

            const deleteRes = await this.productModel.deleteOne({Product_id:body.Product_id});
        console.log(deleteRes, "deleteRes...")

            if (deleteRes.n == 1) {
                return {
                    statusCode: HttpStatus.OK,
                    message: 'User deleted successfully',
                };
            }
            return {
                StatusCode: HttpStatus.BAD_REQUEST,
                Message: "User deletion Failed"
            }
            
        } catch (error) {
            let error_response = {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: error,
            };
            return error_response;
        }

    }

    async usersList(Product_Id: string) {
        try {

            const userResponse = await this.productModel.find({ Product_Id: Product_Id})

            if (userResponse) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: 'User Details',
                    Data: {
                        UserDetails: userResponse
                    }

                }
            }
            return {
                StatusCode: HttpStatus.BAD_REQUEST,
                Message: "InValid Request"
            }

        } catch (error) {
            return {
                StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: error

            }
        }
    }

}
