import { prisma } from '../lib/prisma'

interface registerUserUseCase {
  name: string
  email: string
  password: string
}

export async function registerUserUseCase({
  name,
  email,
  password,
}: registerUserUseCase) {
  await prisma.user.create({ data: { name, email, password_hash: password } })
}
