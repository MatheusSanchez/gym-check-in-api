import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/gym-repository'

export interface FetchNearbyGymsRequest {
  userLatitude: number
  userLongitude: number
}

export interface FetchNearbyGymsResponse {
  gyms: Gym[]
}

export class FetchNearbyGyms {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsRequest): Promise<FetchNearbyGymsResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
