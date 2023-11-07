import { GymRepository } from '@/repositories/gym-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { CreateGymUseCaseUseCase } from './createGymUseCase'
import { InMemomryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymRepository: GymRepository
let createGymUseCaseUseCase: CreateGymUseCaseUseCase

describe('Create Gym Use Case Test', () => {
  beforeEach(() => {
    gymRepository = new InMemomryGymRepository()
    createGymUseCaseUseCase = new CreateGymUseCaseUseCase(gymRepository)
  })

  it('should create a gym', async () => {
    const { gym } = await createGymUseCaseUseCase.execute({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.9880184,
      longitude: -47.7874595,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
