import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../check-in-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInRepository implements CheckInRepository {
  public dbCheckIns: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.dbCheckIns.findIndex(
      (savedCheckIn) => savedCheckIn.id === checkIn.id,
    )

    if (checkInIndex >= 0) {
      this.dbCheckIns[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findById(checkInId: string) {
    const checkIn = this.dbCheckIns.find((checkIn) => checkIn.id === checkInId)

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async coutByUser(userId: string): Promise<number> {
    return this.dbCheckIns.filter((checkIn) => checkIn.user_id === userId)
      .length
  }

  async findManyByUserId(userId: string, page: number) {
    return this.dbCheckIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.dbCheckIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.dbCheckIns.push(checkIn)

    return checkIn
  }
}
