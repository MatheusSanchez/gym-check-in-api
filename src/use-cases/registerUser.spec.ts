import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUserUseCase } from './registerUser'
import { compare } from 'bcryptjs'
import { UserAlredyExistError } from './errors/userAlreadyExistsError'

let userRepository: InMemoryUserRepository
let userRegisterUseCase: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    userRegisterUseCase = new RegisterUserUseCase(userRepository)
  })

  it('should hash user password upon registration', async () => {
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
    const { newUser } = await userRegisterUseCase.execute({
      email: 'johndoe@email.com',
      name: 'John Doe',
      password: '12345',
    })

    expect(newUser.id).toEqual(expect.any(String))
  })
})
