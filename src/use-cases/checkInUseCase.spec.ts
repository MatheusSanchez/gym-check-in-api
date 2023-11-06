import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './chechInUseCase'
import { expect, beforeEach, describe, it, vi, afterAll } from 'vitest'
import { UserAlredyCheckedInError } from './errors/userAlreadyCheckedIn'

let checkInRepository: InMemoryCheckInRepository
let checkInUseCase: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(UserAlredyCheckedInError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
