import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileService } from './file.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}


 
    @Post('upload/:userId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('userId', ParseIntPipe) userId: number): Promise<any> {
      try {
        const createdFile = await this.fileService.uploadFile(file, userId);
        return { message: 'File uploaded successfully', fileId: createdFile.id };
      } catch (error) {
        return { message: 'File upload failed', error: error.message };
      }
    }
   
    @Post('uploadPost/:postId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPost(@UploadedFile() file: Express.Multer.File, @Param('postId', ParseIntPipe) postId: number): Promise<any> {
      try {
        const createdFile = await this.fileService.uploadFile(file, postId);
        return { message: 'File uploaded successfully', fileId: createdFile.id };
      } catch (error) {
        return { message: 'File upload failed', error: error.message };
      }
    }
  
  
  @Get('getfile/:id')
  async getFileById(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      const file = await this.fileService.getfile(id);

      if (!file) {
        res.status(404).send('File not found');
        return;
      }

      res.setHeader('Content-Type', file.mimeType || 'application/octet-stream');
      

      const fileContent = Buffer.from(file.filecontent, 'base64');
      res.send(fileContent);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  }
   
      @Get("download/:id")
     
    async downloadfile(@Param('id') id : number, @Res() res : Response) : Promise<any>{
      try {
        
            const file = await this.fileService.getfile(id);
            if (!file) {
              return res.status(404).send('File not found');
            }
            res.set({
              'Content-Type': file.mimeType || 'application/octet-stream',
              'Content-Disposition': `attachment; filename=${file.filename}`,
            })

            



      const fileContent = Buffer.from(file.filecontent, 'base64');
      res.send(fileContent);
    } catch (error) {
      res.status(500).json({ message: 'File download failed', error: error.message });
    }
  }


  @Post('link-to-post')
  async linkFileToPost(@Body('postId') postId: number): Promise<any> {
    const linkedFile = await this.fileService.linkFileToPost(postId);
    return { message: 'File linked to post successfully', linkedFile };
  }
  @Post('link-to-user')
  async linkFileToUser(@Body('userId') userId: number): Promise<any> {
    const linkedFile = await this.fileService.linkFileToUser(userId);
    return { message: 'File linked to user successfully', linkedFile };
  }
}








// res.setHeader('Content-Type', '');   
      //       res.set({
      //   // 'Content-Type': 'application/octet-stream',
      //   // 'Content-Disposition': `attachment; filename=${file.filename}`,
      //   'Content-Type': 'image/jpg'
      // });



      // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<any> {
  //   try {
  //     const createdFile = await this.fileService.uploadFile(file);

  //     return { message: 'File uploaded successfully', fileId: createdFile.id };
  //   } catch (error) {
  //     return { message: 'File upload failed', error: error.message };
  //   }
  // }




































         // async downloadFile(@Param('fileId') id: number, @Res() res: Response): Promis<any> {
        // try {
      //        const file = await this.fileService.getfile(id); // Replace with your method to get file by ID
            // console.log(file, "File is ");
          
    
      //     if (!file || !file.content) {
      //       res.status(404).json({ message: 'File not found or content unavailable' });
      //       return;
      //     }
    
      //     res.set({
      //       'Content-Type': 'application/octet-stream',
      //       'Content-Disposition': `attachment; filename=${file.filename}`,
      //     });
    
      //     const fileContent = Buffer.from(file.content, 'base64');
      //     res.send(fileContent);
      //   // } catch (error) {
      //   //   res.status(500).json({ message: 'File download failed', error: error.message });
      //   // }
      // }
    
    

