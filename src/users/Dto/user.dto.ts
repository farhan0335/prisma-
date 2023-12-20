
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {

    // @IsString()
    // @IsNotEmpty()
    // name: string; // Assuming 'name' is a valid field for your use case
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password: string;
}
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//     provider = "prisma-client-js"
//   }
  
//   datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
//   }
  
//   model User {
//    id              Int       @default(autoincrement()) @id
//     email           String    @unique
//     name            String?
//     password        String?
//     // profilepicture  File?     @relation(fields: [profilepictureId], references: [id])
//     // profilepictureId Int? @unique
//     posts           Post[]
  
//   }
//   model Post {
//     id        Int      @default(autoincrement()) @id
//     title     String
//     content   String?
//     published Boolean? @default(true)
//     author    User?    @relation(fields: [authorId], references: [id])
//     authorId  Int?
//   }
  
//   model File{
//    id        Int      @id @default(autoincrement())
//     filename  String
//     fileContent Filecontent?
//     // mimetype  String
//     // path      String
//     // user      User?
  
  
//   }
//   model Filecontent {
//      id        Int    @id @default(autoincrement())
//     content Bytes
//     file File @relation(fields: [filedId], references: [id])
//     filedId Int @unique
//   }
//   // enum Roles{
//   //   User
//   //   Admin
//   // }
    