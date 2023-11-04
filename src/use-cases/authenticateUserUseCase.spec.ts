import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticateUserUseCase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

let userRepository: InMemoryUserRepository
let authenticateUserUseCase: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)
  })

  it('should be able to authenticate user', async () => {
    const email = 'johndoe@email.com'
    const password = '12345'

    await userRepository.create({
      email,
      name: 'John Doe',
      password_hash: await hash(password, 6),
    })

    const { user } = await authenticateUserUseCase.execute({ email, password })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@email.com'
    const password = '12345'

    expect(() =>
      authenticateUserUseCase.execute({ email, password }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@email.com'
    const password = '123456'
    const wrongPassword = '123123'

    await userRepository.create({
      email,
      name: 'John Doe',
      password_hash: await hash(password, 6),
    })

    expect(() =>
      authenticateUserUseCase.execute({
        email,
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
