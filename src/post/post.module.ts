import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PrismaClient } from '@prisma/client';

@Module({
  providers: [PostService, PrismaService, UsersService,PrismaClient ],
  controllers: [PostController]
})
export class PostModule {}
