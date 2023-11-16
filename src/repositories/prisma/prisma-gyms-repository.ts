import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymRepository } from '../gym-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data })

    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchByTitle(title: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: { title: { contains: title } },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * 
      cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * 
      sin( radians( latitude ) ) ) ) <= 10    
    `

    return gyms
  }
}
