import { Controller, Body, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res, Delete, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { DeleteProduct, productRegister, updateProduct } from './dto/Product.dto';
import { ProductService } from "../product/product/product.service";
import { extname } from 'path';
import { Response } from 'express';
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }
    @Post('/register')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: './files',
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                    cb(null, `${randomName}${extname(file.originalname)}`)
                }
            }),
        }),
    )
    async create(@Body() req: productRegister, @UploadedFiles() documents) {
        try {
            const result = await this.productService.Create(req, documents)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

    @Put('/updateProduct')
    async update(@Body() req: updateProduct) {
        try {
            const result = await this.productService.updateProduct(req)
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    @Delete('/delete')
    async deleteUser(@Body() req: DeleteProduct) { 
      try {
        let response = await this.productService.delete(req);
  
        return response
      } catch (error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        };
      }
    } 
    @Get('/UsersList')
    async usersList(@Query('ProductId') Product_Id : string) {
        console.log(Product_Id)
        try {
            const response = await this.productService.usersList(Product_Id)
            return response
        } catch (error) {
            return {
                StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                Message : error
            }
        }
    }

}
