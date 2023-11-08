import { Decimal } from '@prisma/client/runtime/library'
import { GymRepository } from '../gym-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemomryGymRepository implements GymRepository {
  public dbGyms: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.dbGyms.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.dbGyms.find((gym) => gym.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async searchByTitle(title: string, page: number) {
    return this.dbGyms
      .filter((gym) => gym.title.includes(title))
      .slice((page - 1) * 20, page * 20)
  }
}
