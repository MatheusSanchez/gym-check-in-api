import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './checkInUseCase'
import { expect, beforeEach, describe, it, vi, afterAll } from 'vitest'
import { UserAlredyCheckedInError } from './errors/userAlreadyCheckedIn'
import { InMemomryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { Coordinate } from '@/utils/get-distance-between-coordinates'
import { ResourceNotFoundError } from './errors/resourceNotFound'
import { MaxDistanceError } from './errors/maxDistanceError'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemomryGymRepository
let checkInUseCase: CheckInUseCase

const gymCoordinate: Coordinate = {
  latitude: 0,
  longitude: 0,
}

const gymId = 'gym-01'

describe('Check-in use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemomryGymRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

    await gymRepository.create({
      id: gymId,
      title: 'JavaScript Gym',
      latitude: new Decimal(gymCoordinate.latitude),
      longitude: new Decimal(gymCoordinate.longitude),
    })

    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should be able to check in a gym', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: gymCoordinate.latitude,
      userLongitude: gymCoordinate.longitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in a gym that does not exist', async () => {
    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gymThatDoesNotExistId',
        userId: 'user-01',
        userLatitude: gymCoordinate.latitude,
        userLongitude: gymCoordinate.longitude,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: gymCoordinate.latitude,
      userLongitude: gymCoordinate.longitude,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId,
        userId: 'user-01',
        userLatitude: gymCoordinate.latitude,
        userLongitude: gymCoordinate.longitude,
      }),
    ).rejects.toBeInstanceOf(UserAlredyCheckedInError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: gymCoordinate.latitude,
      userLongitude: gymCoordinate.longitude,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId,
      userId: 'user-01',
      userLatitude: gymCoordinate.latitude,
      userLongitude: gymCoordinate.longitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    const farAwayUserCoordinate: Coordinate = {
      latitude: -21.9880184,
      longitude: -47.7874595,
    }

    await expect(() =>
      checkInUseCase.execute({
        gymId,
        userId: 'user-01',
        userLatitude: farAwayUserCoordinate.latitude,
        userLongitude: farAwayUserCoordinate.longitude,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
