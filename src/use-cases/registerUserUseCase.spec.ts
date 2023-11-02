import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { RegisterUserUseCase } from './registerUserUseCase'
import { compare } from 'bcryptjs'
import { UserAlredyExistError } from './errors/userAlreadyExistsError'

// test validation errors
describe('Register User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const userRepository = new InMemoryUserRepository()
    const userRegisterUseCase = new RegisterUserUseCase(userRepository)

    const password = '12345'

    const { newUser } = await userRegisterUseCase.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      newUser.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const userRepository = new InMemoryUserRepository()
    const userRegisterUseCase = new RegisterUserUseCase(userRepository)

    const email = 'johndoe@email.com'

    await userRegisterUseCase.execute({
      email,
      name: 'John Doe',
      password: '12345',
    })

    await expect(() =>
      userRegisterUseCase.execute({
        email,
        name: 'John Doe',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistError)
  })

  it('should be able to register a new User', async () => {
    const userRepository = new InMemoryUserRepository()
    const userRegisterUseCase = new RegisterUserUseCase(userRepository)

    const { newUser } = await userRegisterUseCase.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '12345',
    })

    expect(newUser.id).toEqual(expect.any(String))
  })
})
