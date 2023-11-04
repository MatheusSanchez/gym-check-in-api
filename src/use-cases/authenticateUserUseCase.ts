import { UserRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from './errors/invalidCredentialsError'
import { compare } from 'bcryptjs'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: AuthenticateUserUseCaseRequest) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
