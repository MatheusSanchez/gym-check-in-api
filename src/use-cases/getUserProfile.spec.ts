import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './getUserProfile'
import { describe, expect, beforeEach, it } from 'vitest'

import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resourceNotFound'

let userRepository: InMemoryUserRepository
let getUserProfileUseCase: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(userRepository)
  })

  it('should be able to get user profile', async () => {
    const email = 'johndoe@email.com'
    const password = '12345'
    const name = 'John Doe'

    const newUser = await userRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
    })

    const { user } = await getUserProfileUseCase.execute({ userId: newUser.id })

    expect(user.id).toEqual(newUser.id)
    expect(user.name).toEqual(name)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
