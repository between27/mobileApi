/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const PostsController = () => import('#controllers/posts_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')

router.get('/posts', [PostsController, 'index'])
router.post('/posts', [PostsController, 'store']).use(middleware.auth())
router.get('/posts/:id', [PostsController, 'show'])
router.put('/posts/:id', [PostsController, 'update']).use(middleware.auth())
router.delete('/posts/:id', [PostsController, 'destroy']).use(middleware.auth())
