import { Controller, Get, Post, Body, Param, Put, Delete, Headers, UnauthorizedException, UseInterceptors, UploadedFile, Request } from '@nestjs/common';
import { UsersService } from './users.service';
// import { User as UserModel, Prisma, User } from '@prisma/client';
import { LoginDto } from './Dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid'
// import path from 'path';
// import { Observable, map, of } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  async createUser(@Body('name') name: string,
    @Body('email') email: string,
    @Body('password') passwrod: string,
    @Body('password') profilepicture: string,
  ) {
    const newUser = await this.usersService.createUser(name, email, passwrod, profilepicture);
    return newUser;
  }
  @Post('sigin')
  async signin(@Body() dto: LoginDto) {
    return this.usersService.login(dto)
  }
  // @Post('link-to-user')
  // async linkFileToUser(@Body('userId') userId: number, @Body('fileId') fileId: number): Promise<any> {
  //   const linkedFile = await this.usersService.linkFileToUser(userId, fileId);
  //   return { message: 'File linked to user successfully', linkedFile };
  // }
  @Post('refresh-token')
  async refreshAccessToken(@Headers('authorization') authorization: string,) {
    // try {
    const newAccessToken = await this.usersService.refreshAccessToken(authorization);
    return ({ access_token: newAccessToken.access_token });
    // } catch (error) {
    //   // throw new UnauthorizedException('Invalid refresh token');
    // } 
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') passwrod: string,

  ) {
    const updatedUser = await this.usersService.updateUser(id, name, email, passwrod);
    return updatedUser;
  }
  @Get(':id')
  async getuser(id: number): Promise<any> {
    return this.usersService.getUser1(id)
  }
  @Get()
  async getAllUser(): Promise<any> {
    return this.usersService.getAllUser()
  }
  @Post("/upload")
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);
    return "success";
  }














  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: "./Uploads",
  //     filename: (req, file, cb) => {
  //       const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
  //       const extension: string = path.parse(file.originalname).ext
  //       cb(null, `${filename}${extension}`)
  //     }
  //   })
  // }))
  //   @Post("upload")
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: "./Uploads",
  //     filename: (req, file, cb) => {
  //       const originalName = file.originalname || 'default'; // Set a default filename if originalname is undefined
  //       const parsedPath = path.parse(originalName);
  //       const filename: string = (parsedPath.name || 'file') + uuidv4(); // Using parsedPath.name or 'file' if it's undefined
  //       // const extension: string = parsedPath.ext || '.txt'; // Using '.txt' as the default extension if ext is undefined
  //       cb(null, `${filename}`);
  //     }
  //   })
  // }))
  // async uploadfile(@UploadedFile() file): Promise<Observable<object>> {


  //     console.log(file, "File is uploaded ");

  //     return of({ imagePath: file.filename })
  //   }

  //   @Get()
  //   async getUsers(): Promise<UserModel[]> {
  //     return this.usersService.users({});
  //   }

  //   async getPostById(@Param('id') id: string): Promise<UserModel[]> {
  //     return this.usersService.users({ where : {id: Number(id)} });

  //   }

  //   @Post()
  //   async createUser(@Body() createUserInput: Prisma.UserCreateInput): Promise<UserModel> {
  //     return this.usersService.createUser(createUserInput);
  //   }


  //   @Put(':id')
  //   async updateUser(
  //     @Param('id') id: string,
  //     @Body() userData: Prisma.UserUpdateInput,
  //   ): Promise<UserModel> {
  //     return this.usersService.updateUser({
  //       where: { id: parseInt(id, 10) },
  //       data: userData,
  //     });
  //   }

  //   @Delete(':id')
  //   async deleteUser(@Param('id') id: string): Promise<UserModel> {
  //     const deletedUser = await this.usersService.deleteUser({where : {id : Number(id)}});
  //     return deletedUser; // Assuming your deleteUser method returns the deleted user
  //   }
}
