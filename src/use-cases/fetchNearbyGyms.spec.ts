import { GymRepository } from '@/repositories/gym-repository'
import { describe, expect, beforeEach, it } from 'vitest'
import { InMemomryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGyms } from './fetchNearbyGyms'

let gymRepository: GymRepository
let fetchNearbyGyms: FetchNearbyGyms

describe('Fetch nearby Gyms Use Case Test', () => {
  beforeEach(() => {
    gymRepository = new InMemomryGymRepository()
    fetchNearbyGyms = new FetchNearbyGyms(gymRepository)
  })

  it('should be able to fetch nearby a gyms by title', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymRepository.create({
      title: 'Far Away Gym',
      description: null,
      phone: null,
      latitude: -22.2258845,
      longitude: -48.3157508,
    })

    const { gyms } = await fetchNearbyGyms.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
