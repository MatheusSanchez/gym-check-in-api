import { GymRepository } from '@/repositories/gym-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { CreateGymUseCase } from './createGym'
import { InMemomryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let gymRepository: GymRepository
let createGymUseCase: CreateGymUseCase

describe('Create Gym Use Case Test', () => {
  beforeEach(() => {
    gymRepository = new InMemomryGymRepository()
    createGymUseCase = new CreateGymUseCase(gymRepository)
  })

  it('should create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -21.9880184,
      longitude: -47.7874595,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
