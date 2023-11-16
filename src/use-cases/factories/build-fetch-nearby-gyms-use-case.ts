import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGyms } from '../fetchNearbyGyms'

export function buildFetchNearbyGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyGyms(gymRepository)

  return fetchNearbyGymsUseCase
}
