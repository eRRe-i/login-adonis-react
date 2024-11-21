import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  async run() {
    await User.firstOrCreate({email: 'leonardo@gmail.com'},{
      fullName: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: await hash.make('senhaSegura123'),
    })  }
}