import { Decimal } from '@prisma/client/runtime/library'
import { GymRepository } from '../gym-repository'
import { Gym } from '@prisma/client'

export class InMemomryGymRepository implements GymRepository {
  public dbGyms: Gym[] = []

  async findById(gymId: string) {
    const gym = this.dbGyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
