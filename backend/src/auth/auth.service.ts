import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, RegisterDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
 
 @Injectable()
 export class AuthService {
    constructor(private prisma: PrismaService){}
    
    async signup(dto: RegisterDto){
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                }
            });
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002') {
                    throw new ForbiddenException('credentials taken')
                }
            }
            throw error;
        }
    }
    async signin(dto:AuthDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        })
        if (!user) {
            throw new ForbiddenException('Credenciais Incorretas')
        }

        const pwMatches = await argon.verify(user.hash, dto.password)
        if(!pwMatches) {
            throw new ForbiddenException('Credenciais Incorretas')
        }
    }
 }