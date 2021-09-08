import { Controller, Body, Get, Post, Put, Delete, HttpStatus, Query } from '@nestjs/common';
import { partnersRegistration, updatePartner } from './dto/partners.dto';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
    constructor(private partnersService: PartnersService) { }
    
    @Post('/register')
    async create(@Body() req: partnersRegistration) {
        try {
            const result = await this.partnersService.Create(req)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }
    @Put('/update')
    async update(@Body() req: updatePartner) {
        console.log(req,'update')
        try {
            const result = await this.partnersService.updatePartners(req)
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    @Get('/userdetails')
    async userDetails(@Query('UserId') UserId : string) {
        console.log(UserId)
        try {
            const response = await this.partnersService.UserDetails(UserId)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }
  
}
