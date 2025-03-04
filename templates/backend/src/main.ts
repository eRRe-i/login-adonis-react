import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import { RedisStore } from 'connect-redis'
import { createClient } from 'redis'
import { ValidationPipe } from '@nestjs/common'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  let redisClient = createClient()
  await redisClient.connect().catch(console.error)

  if (!redisClient.isReady) {
    console.error('Falha ao conectar ao Redis. Encerrando o servidor...')
    process.exit(1)
  }

  let redisStoreInstance = new RedisStore({
    client: redisClient,
    prefix: 'myApp:',
  })

  app.use(
    session({
      store: redisStoreInstance,
      secret: 'usgaihyuehfkxhcediuchxkjhuidchkxhcudh',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
      },
    }),
  )
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.enableCors({
    origin: 'http://localhost:5173', // Permite apenas o frontend em localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true, // Permite cookies e autenticação
  })

  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  app.use((req, res, next) => {
    console.log('Requisição recebida:', req.method, req.url)
    console.log('Corpo da requisição:', req.body)
    next()
  })

  app.use(passport.initialize())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
