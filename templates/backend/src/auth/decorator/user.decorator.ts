import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetUser = createParamDecorator(
  (data: string | string[] | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user // Assume que o usuário está disponível no request

    if (!data) {
      // Se nenhum atributo for especificado, retorna o usuário completo
      return user
    }

    if (typeof data === 'string' || typeof data === 'number') {
      // Se data for uma string ou número, retorna apenas o atributo solicitado
      return user[data]
    }

    if (Array.isArray(data)) {
      // Se data for um array de strings, cria um novo objeto com os atributos escolhidos
      const result = {}
      for (const key of data) {
        if (user.hasOwnProperty(key)) {
          result[key] = user[key]
        }
      }
      return result
    }

    // Caso inesperado, retorna o usuário completo
    return user
  },
)
