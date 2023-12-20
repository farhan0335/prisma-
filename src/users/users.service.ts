import { BadRequestException, ForbiddenException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {  User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './Dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtSecret, jwtRefreshSecret } from 'src/utils/constants';

export @Injectable()
class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtservice: JwtService) { }

  async createUser(name: string, email: string, password: string, profilepicture): Promise<User> {
    const user = this.prisma.user.findUnique({ where: { email } })
    // if (user) {
    //   throw new BadRequestException("Email already exists")
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      

      },
    });
  }

  // async linkFileToUser(userId: number, fileId: number): Promise<any> {
  //   return this.prisma.user.update({
  //     where: { id: userId },
  //     data: {
  //       imageFile: {
  //         connect: { id: fileId },
  //       },
  //     },
  //   });
  // }

  async getUser(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async login(dto : LoginDto): Promise<any> { 
    const user = await this.getUser(dto.email); 
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtservice.sign(payload, {
      expiresIn: '200m',
      secret: jwtSecret,
    });
    const refresh_token = this.jwtservice.sign({}, {
      expiresIn: '400m',
      secret: jwtRefreshSecret,
    });
    return { access_token, refresh_token };
  }

  async refreshAccessToken(authorizationHeader: string): Promise<{ access_token: string }> {
    try {
      const tokenParts = authorizationHeader.split(' ');

      if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new UnauthorizedException('Invalid token format');
      }
      const refreshToken = tokenParts[1];
      const decoded = this.jwtservice.verify(refreshToken, {
        secret: jwtRefreshSecret,
      });
      const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } })      
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtservice.sign(payload, {
        expiresIn: '1h',
        secret: jwtRefreshSecret,
      });
      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

  }
  async updateUser(id: number, name: string, email: string, password: string): Promise<any> {
    return this.prisma.user.update({
      where: { id: Number(id) }, data: {
        name,
        email,
        password
      },
    });
  }
  async getUser1(userId: number): Promise<any> {
    return this.prisma.user.findUnique({ where: { id: Number(userId) } })
  }
  async getAllUser(): Promise<any> {
    return this.prisma.user.findMany()
  }
  async comparePassword(args: { password: string, hash: string }) {
    return await bcrypt.compare(args.password, args.hash)
  }
  
  
  // async signToken(args: { name: string; email: string }) {
  //   const payload = {
  //     name: args.name,
  //     email: args.email,
  //   };
  //   const token = await this.jwtservice.signAsync(payload, {
  //     expiresIn: '1m',
  //     secret: jwtSecret,
  //   });
  //   return token;
  // }
}
module.exports = {
  UsersService,
};








// async findByEmail(email: string) {
//   const user = this.prisma.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   return user;
// }

