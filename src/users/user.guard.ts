import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma.service";
@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private readonly userService: UsersService,
    private readonly prismaservice : PrismaService

  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization?.replace('Bearer ', ''); //get accesstoken from headers
    if (!accessToken) {
      throw new UnauthorizedException('Access token not found');
    }
    try {
      const decodedToken = await this.jwtservice.verify(accessToken, { secret: process.env.JWT_SECRET }); // Verify the access token
      const { email } = decodedToken;
      console.log(decodedToken);
      
      const user = await this.prismaservice.user.findUnique({where : {email: email}});
      console.log(user, "User1122222");
      
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('you are Unauthorized');
    }
  }

}