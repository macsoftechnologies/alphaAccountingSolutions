import { Controller,  Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, Delete, Patch } from '@nestjs/common';
import { user_Id } from 'src/users/dto/user.dto';
import { orderStatus, productOrder } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) { }
    @Post('/register')
    async create(@Body() req: productOrder) {
        try {
            const result = await this.ordersService.Create(req)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

    @Get('/OrderList')
    async orderDetails(@Query('UserId') UserId : string) {
        console.log(UserId)
        try {
            const response = await this.ordersService.orderDetails(UserId)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }

    @Get('/UsersList')
    async UsersList(@Query('Product_Id') ProductId : string) {
        console.log(ProductId)
        try {
            const response = await this.ordersService.UsersList(ProductId)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }

    @Post('/status')
    async OrderStatus(@Body() OrderStatus : orderStatus) {
       // console.log(ProductId)
        try {
            const response = await this.ordersService.updateStatus(OrderStatus)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }

 
}
