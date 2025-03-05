import {
  Request,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto, RegisterDto } from './dto'
import { AuthGuard } from '@nestjs/passport'
import { MultiAuthGuard } from './guard/multiAuth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto)
  }

  @UseGuards(AuthGuard('local'))
  @Post('login-jwt')
  async loginJwt(@Request() req, @Body() body) {
    console.log('Corpo da requisição:', body)
    console.log('Usuário autenticado:', req.user)
    return this.authService.signTokens(req.user.id, req.user.email)
  }
  @UseGuards(AuthGuard('local'))
  @Post('login-session')
  async loginSession(@Request() req) {
    return { message: 'Login realizado com sucesso', user: req.user.email }
  }

  @UseGuards(MultiAuthGuard)
  @Get('logged')
  getData(@Request() req) {
    return { message: 'Rota acessada com sucesso!', user: req.user }
  }
}
