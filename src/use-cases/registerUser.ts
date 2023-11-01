import { prisma } from '../lib/prisma'
import { hash } from 'bcryptjs'

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
  const password_hash = await hash(password, 6)
  await prisma.user.create({ data: { name, email, password_hash } })
}
