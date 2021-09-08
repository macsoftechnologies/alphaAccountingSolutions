import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema/user.schema';
import { UserRegister, UserLogin, VerifyOtpDto, UserUpdate, DeleteUser, updateUser } from '../dto/user.dto';
import moment = require('moment');
@Injectable()
export class UsersService {


    constructor(@InjectModel(Users.name) private userModel: Model<Users>) { }


    async Create(req: UserRegister) {

        try {
            const loginRes = await this.userModel.findOne({ $or: [{ Email: req.Email }, { Mobile: req.MobileNum }] })

            if (loginRes) {
                return {
                    statusCode: HttpStatus.CONFLICT,
                    message: `User Already Exits with ${loginRes.Email} and ${loginRes.MobileNum}`
                }
            }

            const registerRes = await this.userModel.create(req)
            if (registerRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        authentication: {
                            UserId: registerRes.UserId,
                            Email: registerRes.Email,
                            MobileNum: registerRes.MobileNum
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
    async Login(req: UserLogin) {
        try {

            const loginRes = await this.userModel.findOne({ $or: [{ Email: req.Email }, { MobileNum: req.MobileNum }] }).lean()
            if (loginRes) {
                if (loginRes.Password === req.Password) {

                    return {
                        statusCode: HttpStatus.OK,
                        message: "Login SuccessFully",
                        authentication: {
                            UserId: loginRes.UserId,
                            Email: loginRes.Email
                        }
                    }
                }

                return {
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: "Invalid Password"
                }

            }
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: "User Not Found"

            }
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }
    async getUsers() {
        const users = await this.userModel.find().exec();
        return users;
    }

    async UserDetails(Email: string) {
        try {

            const userResponse = await this.userModel.findOne({ Email: Email })

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

    async update(condition: any, params: any): Promise<any> {
        try {
            console.log(params);

            const user = await this.userModel.findOne(condition);

            if (!user) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User Not found',
                };
            }
            await this.userModel.updateOne(condition, params);

            return {
                statusCode: HttpStatus.OK,
                message: 'Ok',
            };
        } catch (error) {
            let error_response = {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                data: null,
                message: error,
            };
            return error_response;
        }
    }

    
     
  /* async remove(UserId: string) {
        console.log(UserId)
        try {

            const userResponse = await this.userModel.updateOne({ UserId: UserId })
            //console.log(userResponse);
            if (userResponse) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Deleted SuccessFully",

                }

            }
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request"
            }

        } catch (error) {

            return {
                StatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                Message: error

            }
        }
    }*/
  
    async delete(body: DeleteUser) {
        try {

              console.log(body.UserId, "UserId.....")
            const deleteRes = await this.userModel.deleteOne({UserId:body.UserId});
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
   
    async updateUser(body: updateUser) {
        try {
            // console.log(body, "body............")
            const updateRes = await this.userModel.updateOne({ UserId: body.UserId }, { $set: { UserName: body.UserName, Email: body.Email, Password: body.Password, MobileNum: body.MobileNum } })
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

  /*  async rating(req: rating) {
        try {
             const registerRes = await this.userModel.create(req)
           
             if (registerRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Thank you for your response",
                    data: {
                        UserRating: {
                            rating: registerRes.Rating,
                            Product_Id: registerRes.Product_id,
                            UserId: registerRes.UserId
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
    */
}
