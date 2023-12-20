import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Post, PrismaClient } from '@prisma/client';

export @Injectable()
class PostService {
    constructor(private readonly prisma: PrismaClient) { }

    async createPost(title: string, content: string, authorId: number, fileId: number): Promise<any> {
        return this.prisma.post.create({
          data: {
            title,
            content,
            author: {
              connect: { id: authorId },
            },
            attachments: {
              connect: { id: fileId },
            },
          },
        });
      }
      // async linkFileToPost(postId: number, fileId: number): Promise<any> {
      //   const post = await this.prisma.post.findUnique({ where: { id: postId } });
      
      //   if (!post) {
      //     throw new Error(`Post with ID ${postId} not found`);
      //   }
      
      //   return this.prisma.post.update({  
      //     where: { id: postId },
      //     data: {
      //       attachments: {
      //         connect: { id: fileId },
      //       },
      //     },
      //   });
      // }
      
    async updatePost(postId: number, title?: string, content?: string): Promise<Post | null> {
        return this.prisma.post.update({
            where: { id : Number(postId) },
            data: {
                title,
                content,
            },
        });
    }

    async deletePost(postId: number): Promise<Post | null> {
        return this.prisma.post.delete({
            where: { id : Number(postId) },
        });
    }

    async getPostById(postId: number): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({
            where: { id : Number(postId) },
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} not found`);
        }

        return post;
    }
    async getAllPosts(): Promise<Post[]> {
        return this.prisma.post.findMany();
      }

}
module.exports = {
    PostService,
};
