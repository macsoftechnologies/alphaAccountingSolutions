import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { updateUser, userStatus, UserUpdate } from 'src/users/dto/user.dto';
import { Users } from 'src/users/schema/user.schema';
import { productRegister, productStatus, productUpdate } from './dto/admin.dto';
import { admin } from './schema/admin.schema';
@Injectable()
export class AdminService {
 constructor(@InjectModel(Users.name) private userModel :Model<Users>,@InjectModel(admin.name) private adminModel :Model<admin>) {}
 //List of Users for product 
 async listUsers() {
    try{   
    const users = await this.userModel.find().exec();
    if(users)
        return  {
            statusCode: HttpStatus.OK,
            message: "List of Users",
            data: {
               users,
               noOfUsers:users.length
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
//Updating products by admin
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
       const registerRes = await this.adminModel.create(req)
       
         if (registerRes) {
            return {
                statusCode: HttpStatus.OK,
                message: "Product added Sucessfully",
                data: {
                    ProductsUpload: {
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

//Getting List of Products
async listProducts() {
    try{
    const products = await this.adminModel.find().exec();
    if(products)
        return  {
            statusCode: HttpStatus.OK,
            message: "List of Products",
            data: {
               products,
               noOfProducts:products.length
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


async updateUser(body: updateUser) {
    try {
         console.log(body, "body............")
        const updateRes = await this.userModel.updateOne({ UserId: body.UserId },{UserName: body.UserName, Email: body.Email, Password: body.Password, MobileNum: body.MobileNum })
         console.log(updateRes, "update,,res")
        if (updateRes.nModified == 1) {
            return {
                StatusCode: HttpStatus.OK,
                Message: "User updated successFully by Admin"
            }
        }
        return {
            StatusCode: HttpStatus.BAD_REQUEST,
            Message: "Updated Failed"
        }
    } catch (error) {
        return {
            StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            Message: error.message
        }
    }
  }
  async productUpdate(body: productUpdate) {
    try {
         console.log(body, "body............")
        const updateRes = await this.adminModel.updateOne({  Product_id: body. Product_id },{Name_of_the_product: body.Name_of_the_product, Description: body.Description, Price : body.Price, Discount: body.Discount, Documents_required:body.Documents_required })
         console.log(updateRes, "update,,res")
        if (updateRes.nModified == 1) {
            return {
                StatusCode: HttpStatus.OK,
                Message: "Product updated successFully by Admin"
            }
        }
        return {
            StatusCode: HttpStatus.BAD_REQUEST,
            Message: "Updated Failed"
        }
    } catch (error) {
        return {
            StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            Message: error.message
        }
    }
 }

 async updateStatus(body: productStatus) {
    console.log(body)
     try {
         // console.log(body, "body............")
         const updateRes = await this.adminModel.updateOne({ Product_id: body.Product_id }, { $set: { status: body.status } })
         // console.log(updateRes, "update,,res")
         if (updateRes.nModified == 1) {
             return {
                 StatusCode: HttpStatus.OK,
                 Message: "Updated SuccessFully"
             }
         }
         return {
             StatusCode: HttpStatus.BAD_REQUEST,
             Message: "Updated Failed"
         }
     } catch (error) {
         return {
             StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             Message: error.message
         }
}
 }

 //Updating User Status
 async updateUserStatus(body: userStatus) {
    console.log(body)
     try {
         // console.log(body, "body............")
         const updateRes = await this.adminModel.updateOne({ UserId: body.UserId }, { $set: { status: body.status } })
         // console.log(updateRes, "update,,res")
         if (updateRes.nModified == 1) {
             return {
                 StatusCode: HttpStatus.OK,
                 Message: "Updated SuccessFully"
             }
         }
         return {
             StatusCode: HttpStatus.BAD_REQUEST,
             Message: "Updated Failed"
         }
     } catch (error) {
         return {
             StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
             Message: error.message
         }
}
 }

}
