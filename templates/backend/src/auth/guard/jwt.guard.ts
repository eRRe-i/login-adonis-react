import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Usa a estratégia 'jwt' para validar o token
      return (await super.canActivate(context)) as boolean
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado')
    }
  }
}
