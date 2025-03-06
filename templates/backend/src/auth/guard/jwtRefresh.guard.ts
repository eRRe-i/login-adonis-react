import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()

    try {
      // Usa a Strategy para validar o token JWT
      await super.canActivate(context)

      // Se o token for válido, permite a requisição
      return true
    } catch (error) {
      // Se o token for inválido ou expirado, tenta renová-lo usando o refresh token
      const refreshToken = request.cookies['refreshToken']

      if (!refreshToken) {
        throw new UnauthorizedException('Token de acesso e refresh token ausentes')
      }

      try {
        const refreshPayload = await this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
        })

        const user = await this.authService.validateUserById(refreshPayload.sub)

        if (!user) {
          throw new UnauthorizedException('Usuário não encontrado')
        }

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          await this.authService.signTokens(user.id, user.email)

        // Atualiza o cabeçalho Authorization com o novo access token
        request.headers['authorization'] = `Bearer ${newAccessToken}`

        // Atualiza o refresh token no cookie, se necessário
        if (this.shouldRenewRefreshToken(refreshPayload.exp)) {
          response.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: this.configService.get('NODE_ENV') === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
        }

        request.user = user

        return true
      } catch (refreshError) {
        throw new UnauthorizedException('Token de atualização inválido ou expirado')
      }
    }
  }

  private shouldRenewRefreshToken(expirationTime: number): boolean {
    const renewalThreshold = 2 * 24 * 60 * 60 * 1000 // 2 dias em milissegundos
    const timeUntilExpiration = expirationTime * 1000 - Date.now()
    return timeUntilExpiration < renewalThreshold
  }
}
