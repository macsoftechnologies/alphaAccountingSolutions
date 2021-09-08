import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { orderStatus, productOrder } from './dto/orders.dto';
import { order } from './dto/schema/order.schema';
@Injectable()
export class OrdersService {
    
    constructor(@InjectModel(order.name) private orderModel: Model<order>) { }


    async Create(req: productOrder) {
        try {
            const orderRes = await this.orderModel.create(req)
            if (orderRes) {
                return {
                    statusCode: HttpStatus.OK,
                    message: "Registered SuccessFully",
                    data: {
                        OrderPlaced: {
                            Order_id: orderRes.Order_id,
                            OrderedPrice: orderRes.OrderedPrice,
                            
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

    async orderDetails(UserId: string) {
        try {

            const userResponse = await this.orderModel.find({ UserId: UserId})

            if (userResponse) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: 'List of Orders',
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

    async UsersList(ProductId: string) {
        try {

            const userResponse = await this.orderModel.find({ ProductId: ProductId})

            if (userResponse) {
                return {
                    StatusCode: HttpStatus.OK,
                    Message: 'List of Users',
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

   
    async updateStatus(body: orderStatus) {
       console.log(body)
        try {
            // console.log(body, "body............")
            const updateRes = await this.orderModel.updateOne({ Order_id: body.Order_id }, { $set: { status: body.status } })
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