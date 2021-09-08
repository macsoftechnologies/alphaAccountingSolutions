import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { partnersRegistration, updatePartner } from './dto/partners.dto';
import { partners } from './schema/partners.schema';

@Injectable()
export class PartnersService {
    constructor(@InjectModel(partners.name) private partnersModel: Model<partners>) { }
   
    async Create(req: partnersRegistration) {
        try {
            const partnersRes = await this.partnersModel.create(req)
            if (partnersRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Partners Registered SuccessFully",
                    data: {
                        PartnersRegistered: {
                            UserId: partnersRes.UserId,
                            ProductId: partnersRes.ProductId,
                            
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

    async updatePartners(body: updatePartner) {
        try {
             console.log(body, "body............")
            const updateRes = await this.partnersModel.updateOne({ UserId: body.UserId ,ProductId: body.ProductId},{Partners:body.Partners})
             console.log(updateRes, "update,,res")
            if (updateRes.nModified == 1) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: "Partner Updated SuccessFully"
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
     async UserDetails(UserId: string) {
        try {

            const userResponse = await this.partnersModel.findOne({ UserId: UserId })

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
