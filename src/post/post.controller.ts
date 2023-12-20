import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { LocalAuthGuard } from 'src/users/user.guard';

import { diskStorage } from 'multer';
import path from 'path';

import { Observable, of } from 'rxjs';


@Controller('posts1')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(LocalAuthGuard)
    @Post()
    async createPost(@Body() postData: { title: string; content: string; authorId: number, fileId: number }) {
        const { title, content, authorId, fileId } = postData;
        return this.postService.createPost(title, content, authorId, fileId);
    }

//   @Post('link-to-post')
//   async linkFileToPost(@Body('postId') postId: number, @Body('fileId') fileId: number): Promise<any> {
//     const linkedFile = await this.postService.linkFileToPost(postId, fileId);
//     return { message: 'File linked to post successfully', linkedFile };
//   }
 
    @UseGuards(LocalAuthGuard)
    @Patch(':id')
    async updatePost(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('content') content: string,
    ) {
        return this.postService.updatePost(id, title, content);
    }
    @UseGuards(LocalAuthGuard)
    @Delete(':id')
    async deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }
    @UseGuards(LocalAuthGuard)
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }
    @UseGuards(LocalAuthGuard)
    @Get()
    async getAllPosts() {
        return this.postService.getAllPosts();
    }
    // @Post(" upload")
    // @UseInterceptors(FileInterceptor('file', {
    //     storage : diskStorage({
    //         destination : "./Uploads",
    //         filename : (req, file, cb)=> {
    //             const filename: string = path.parse(file.originalname).name.replace(/\s/g,'') + uuidv4();
    //             const extension: string = path.parse(file.originalname).ext
    //             cb(null, `${filename}${extension}`)
    //         }
    //     })
    // }))
    // async uploadfile(@UploadedFile() file): Promise<Observable<object>>{
    //     const
    //     console.log(file, "File is uploaded ");
        
    //     return of({imagePath: file.filename})
    // }

}