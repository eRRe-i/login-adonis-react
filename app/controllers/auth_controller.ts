// app/Controllers/Http/AuthController.ts
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async login({ request, response }: HttpContext) { 
    const { email, password } = request.only(['email', 'password'])
  }
  // async logout({ auth }) { /* Lógica de logout */ }
  // async register({ request }) { /* Lógica de registro (opcional) */ }
  // async forgotPassword({ request }) { /* Lógica de recuperação de senha */ }

}

