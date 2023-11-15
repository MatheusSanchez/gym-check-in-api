import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { expect, beforeEach, describe, it, vi, afterEach } from 'vitest'

import { ValidateCheckInUseCase } from './validateCheckIn'
import { randomUUID } from 'node:crypto'
import { ResourceNotFoundError } from './errors/resourceNotFound'
import { LateCheckInError } from './errors/lateCheckInError'

let checkInRepository: InMemoryCheckInRepository
let validateCheckInUseCase: ValidateCheckInUseCase

describe('Validate Check-in use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validade a checkIn', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: randomUUID(),
      gym_id: randomUUID(),
    })

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.dbCheckIns[0].validated_at).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to validade an inexistent checkIn', async () => {
    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: 'inexistentCheckInID',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validade an the checkIn after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))

    const createdCheckIn = await checkInRepository.create({
      user_id: randomUUID(),
      gym_id: randomUUID(),
    })

    const twentyOneMinutesInMS = 1000 * 60 * 21

    vi.advanceTimersByTime(1000 * 60 * twentyOneMinutesInMS)

    await expect(() =>
      validateCheckInUseCase.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInError)
  })
})
