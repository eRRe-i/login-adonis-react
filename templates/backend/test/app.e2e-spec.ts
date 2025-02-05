import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Caminho relativo
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as pactum from 'pactum'
import { AuthDto, RegisterDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes( new ValidationPipe({
      whitelist: true
    }))
    await app.init();
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDb()
    pactum.request.setBaseUrl('http://localhost:3333')
  });

  describe('Auth', () => {
    const registerDto: RegisterDto = {
      email: 'test@gmail.com',
      password: '123',
      firstName: 'Test',
      lastName: 'Master'
    }
    const authDto: AuthDto = {
      email: registerDto.email,
      password: registerDto.password
    }
    describe('SignUp', () => {
      it('should throw if email is empty', () => {
        return pactum.spec()
        .post('/auth/signup')
        .withBody({ 
          email: '',
          password: registerDto.password,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
        })
        .expectStatus(400)
      })
      it('should throw if password is empty', () => {
        return pactum.spec()
        .post('/auth/signup')
        .withBody({ 
          email: registerDto.email,
          password: '',
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
        })
        .expectStatus(400)
      })
      it('should signup', () => {
        return pactum.spec()
        .post('/auth/signup')
        .withBody(registerDto)
        .expectStatus(201)
      })
      it('should throw if credentials are taken', () => {
        return pactum.spec()
        .post('/auth/signup')
        .withBody(registerDto)
        .expectStatus(403)
      })
    })
    describe('SignIn', () => {
      it('should throw error if email is empty', () => {
        return pactum.spec()
      .post('/auth/signin')
      .withBody({email: '', password: authDto.password})
      .expectStatus(400)   
      })
      it('should throw error if email is empty', () => {
        return pactum.spec()
      .post('/auth/signin')
      .withBody({email: authDto.email, password: ''})
      .expectStatus(400)   
      })
      it('should throw if authentication failed', () => {
        return pactum.spec()
      .post('/auth/signin')
      .withBody({email: authDto.email, password: 'wrong'})
      .expectStatus(403)   
      })
      it('should sign in', () => {
        return pactum.spec()
      .post('/auth/signin')
      .withBody(authDto)
      .expectStatus(200)
      .stores('userAT', 'access_token')
      })
    })
  })
  describe('User', () => {
    describe('GetMe', () => {
      it('should get unauthorized', ()=> {
        return pactum.spec()
        .get('/users/getme')
        .expectStatus(401)
      })
      it('should authorize access', ()=> {
        return pactum.spec()
        .get('/users/getme')
        .withHeaders({
          Authorization: 'Bearer $S{userAT}'
        })
        .expectStatus(200)
      })
    })
    describe('editUser', () => {
      it('should update user', () => {
        const editUserDto: EditUserDto = {
          firstName: 'Laluca',
          lastName: 'Pérez',
        }
        return pactum.spec()
        .patch('/users/edit')
        .withHeaders({
          Authorization: 'Bearer $S(userAT)'
        })
        .withBody(editUserDto)
        .expectStatus(200)
        .inspect()
        .expectBodyContains(editUserDto.firstName)
        .expectBodyContains(editUserDto.lastName)
      })
    })
  })

  afterAll(()=> {
    app.close()
  })
});