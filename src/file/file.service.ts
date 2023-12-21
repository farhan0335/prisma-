import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { File } from '@prisma/client';
import { MIMEType, toUSVString } from 'util';
import * as mimeTypes from 'mime-types';



@Injectable()
export class FileService {


  constructor(private readonly prisma: PrismaService) { }

 
  async uploadFile(file: Express.Multer.File, userId: number): Promise<File> {
    const { originalname, buffer } = file;
    const mimeType = mimeTypes.lookup(originalname) || 'application/octet-stream';
    
    const createdFile = await this.prisma.file.create({
      data: {
        filename: originalname,
        filecontent: buffer.toString('base64'),
        mimeType: mimeType,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return createdFile;
  }

  // async uploadPostFiles(files: Express.Multer.File[], postIds: number[]): Promise<File[]> {
  //   const uploadedFiles: File[] = [];

  //   for (const file of files) {
  //     const { originalname, buffer } = file;
  //     const mimeType = mimeTypes.lookup(originalname) || 'application/octet-stream';

  //     for (const postId of postIds) {
  //       const createdFile = await this.prisma.file.create({
  //         data: {
  //           filename: originalname,
  //           filecontent: buffer.toString('base64'),
  //           mimeType: mimeType,
  //           posts: {
  //             connect: {
  //               id: postId,
  //             },
  //           },
  //         },
  //       });

  //       uploadedFiles.push(createdFile);
  //     }
  //   }

  //   return uploadedFiles;
  // }

  async uploadPostFile(file: Express.Multer.File, postId: number): Promise<File> {
    const { originalname, buffer } = file;
    const mimeType = mimeTypes.lookup(originalname) || 'application/octet-stream';
    
    const createdFile = await this.prisma.file.create({
      data: {
        filename: originalname,
        filecontent: buffer.toString('base64'),
        mimeType: mimeType,
        Post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    return createdFile;
  }



  // async uploadFile(file: Express.Multer.File): Promise<File> {
  //   const { originalname, buffer } = file;

  //   const mimeType = mimeTypes.lookup(originalname) || 'application/octet-stream';
  //   const fileEntry = await this.prisma.file.create({
  //     data: {
  //       filename: originalname,
  //       filecontent: buffer.toString('base64'),
  //       mimeType: mimeType,
  //     },
  //   });
  //   return fileEntry;
  // }

  async getfile(id: number): Promise<File | null> {
    const file = await this.prisma.file.findUnique({
      where: { id: Number(id) }
    })

    return file
  }


  async linkFileToPost(postId: number): Promise<any> {
    const existingPost = await this.prisma.user.findUnique({
      where: { id: postId }
    })
    if (!existingPost) {
      throw new Error('Post id not found')
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: {
        attachments: {
          connect: { id: postId },
        },
      },
    });
  }
  async linkFileToUser(userId: number): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId }
    })
    if (!existingUser) {
      throw new Error('User not found')
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        imageFile: {
          connect: { id: userId },
        },
      },
    });
  }


}
