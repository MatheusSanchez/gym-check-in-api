import { Gym, Prisma } from '@prisma/client'

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(gymId: string): Promise<Gym | null>
  searchByTitle(title: string, page: number): Promise<Gym[]>
}
