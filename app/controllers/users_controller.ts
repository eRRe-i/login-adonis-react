import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    // async showProfile({ auth }) { /* Retorna perfil do usuário autenticado */ }
    // async updateProfile({ request, auth }) { /* Atualiza dados do perfil */ }
    // async listUsers({ auth }) { /* Lista todos os usuários (caso admin) */ }
    async dashboard({ auth, inertia } : HttpContext) {

        await auth.authenticate()

        inertia.render('dashboard')
    }

}