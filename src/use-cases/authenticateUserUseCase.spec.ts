import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticateUserUseCase'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'

describe('Authenticate User Use Case', () => {
  it('should be able to authenticate user', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

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
    const userRepository = new InMemoryUserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

    const email = 'johndoe@email.com'
    const password = '12345'

    expect(() =>
      authenticateUserUseCase.execute({ email, password }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository)

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
