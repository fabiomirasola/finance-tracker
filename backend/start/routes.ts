import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const TransactionsController = () => import('#controllers/transactions_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.post('/logout', [AuthController, 'logout'])
  .use(middleware.auth({ guards: ['api'] }))

router.get('/categories', [CategoriesController, 'index'])

router.group(() => {
  router.get('/transactions', [TransactionsController, 'index'])
  router.post('/transactions', [TransactionsController, 'store'])
  router.get('/transactions/:id', [TransactionsController, 'show'])
  router.put('/transactions/:id', [TransactionsController, 'update'])
  router.delete('/transactions/:id', [TransactionsController, 'destroy'])
}).use(middleware.auth())
