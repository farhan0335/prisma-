import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';


@Module({
  imports: [
    PostModule,
    UsersModule,
    PostModule,
    FileModule,

    ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
