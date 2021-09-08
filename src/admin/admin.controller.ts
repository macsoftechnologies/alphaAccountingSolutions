import { UploadedFiles } from '@nestjs/common';
import { Controller, Get, Post, UseInterceptors, Body, HttpStatus, Put  } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { updateUser, userStatus } from 'src/users/dto/user.dto';
import { AdminService } from './admin.service'
import { productRegister, productStatus, productUpdate } from './dto/admin.dto';
@Controller('admin')
export class AdminController {
    constructor(private AdminService: AdminService) { }
   //Getting List of Users By admin
    @Get('/usersList')
    async getAllUsers(){
        const users = await this.AdminService.listUsers();
        return users;
    }
  
    //Updating Products to the application by the user

    @Post('/productsUpload')
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
            const result = await this.AdminService.Create(req, documents)
            console.log("result", result);
            
            return result
        } catch (error) {
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }

    }

 //Getting List of Products
 @Get('/productsList')
    async getAllProducts(){
        const users = await this.AdminService.listProducts();
        return users;
    }

@Put('/updateUser')
      async update(@Body() req: updateUser) {
          try {
              const result = await this.AdminService.updateUser(req)
              return result
          } catch (error) {
              return {
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: error.message,
              };
          }
      }

      @Put('/updateProduct')
      async updateProduct(@Body() req: productUpdate) {
          try {
              const result = await this.AdminService.productUpdate(req)
              return result
          } catch (error) {
              return {
                  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                  message: error.message,
              };
          }
      }

      @Post('/productStatus')
      async ProductStatus(@Body() ProductStatus : productStatus) {
         // console.log(ProductId)
          try {
              const response = await this.AdminService.updateStatus(ProductStatus)
              return response
          } catch (error) {
              return {
                  StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                  Message : error
              }
          }
      }

      @Post('/userStatus')
      async userStatus(@Body() UserStatus : userStatus) {
         // console.log(ProductId)
          try {
              const response = await this.AdminService.updateUserStatus(UserStatus)
              return response
          } catch (error) {
              return {
                  StatusCode : HttpStatus.INTERNAL_SERVER_ERROR,
                  Message : error
              }
          }
      }
  
}
