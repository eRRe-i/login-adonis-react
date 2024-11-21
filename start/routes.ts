/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router.post('/login', '#controllers.auth_controller.login')
router.post('/logout', '#contollers.auth_controller.logout')


