import { GymRepository } from '@/repositories/gym-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { InMemomryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from './searchGym'

let gymRepository: GymRepository
let searchGymUseCase: SearchGymUseCase

describe('Search Gym Use Case Test', () => {
  beforeEach(() => {
    gymRepository = new InMemomryGymRepository()
    searchGymUseCase = new SearchGymUseCase(gymRepository)
  })

  it('should be able to search a gym by title', async () => {
    await gymRepository.create({
      title: 'Sancho Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymRepository.create({
      title: 'Fancho Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gym } = await searchGymUseCase.execute({
      title: 'Sancho Gym',
      page: 1,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Sancho Gym' })])
  })

  it('should be able to search a gym by title but pagionate', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Sancho Gym-${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gym } = await searchGymUseCase.execute({
      title: 'Sancho Gym',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'Sancho Gym-21' }),
      expect.objectContaining({ title: 'Sancho Gym-22' }),
    ])
  })
})
