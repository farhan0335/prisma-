
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  findUnique(arg0: { where: { email: string; }; }) {
    throw new Error('Method not implemented.');
  }
  async onModuleInit() {
    await this.$connect();
  }
//   async enableShutdownHooks(app:INestApplication){
//     this.$on('beforeExist' async () => {
//             await app.close()
//     })
//   }
}
