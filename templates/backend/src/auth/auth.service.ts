import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto, RegisterDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: RegisterDto) {
    const hash = await argon.hash(dto.password)
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      })
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credentials taken')
        }
      }
      throw error
    }
  }
  async validateUser(dto: AuthDto) {
    // Buscar o usuário pelo email
    console.log(dto)
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    // Verificar se o usuário existe
    if (!user) {
      throw new ForbiddenException('Credenciais incorretas')
    }

    // Verificar se a senha está correta
    const pwMatches = await argon.verify(user.hash, dto.password)
    if (!pwMatches) {
      throw new ForbiddenException('Credenciais incorretas')
    }

    return user
  }

  async validateUserById(sub: number) {
    const user = this.prisma.user.findUnique({
      where: { id: sub },
    })
    if (!user) {
      throw new ForbiddenException('Usuário não encontrado')
    }
    return user
  }

  async signTokens(userId: number, email: string) {
    const payload = { sub: userId, email }

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    })

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_REFRESH_SECRET'),
    })

    return { accessToken, refreshToken }
  }
}
