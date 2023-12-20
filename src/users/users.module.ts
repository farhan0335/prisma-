import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from 'src/utils/constants';

@Module({
  imports : [JwtModule, PassportModule,
    JwtModule.register({
      secret : jwtSecret, 
      global: true,
      signOptions: {expiresIn: '2h'}

    })
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, ],
  exports : [UsersService]
})
export class UsersModule {}
