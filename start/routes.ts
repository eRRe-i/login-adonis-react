/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

router.get('/', async ({ inertia }) => {
    return inertia.render('home')
  })
  
router.get('/dashboard', '#controllers.users_controller.dashboard')
router.post('/login', '#controllers.session_controller.store')
router.post('/logout', '#controllers.session_controller.destroy')




