import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'

export interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: RegisterUserRequest) {
    const userAlredyExist = await this.userRepository.findByEmail(email)

    if (userAlredyExist) {
      throw new Error('E-mail already exists.')
    }

    const password_hash = await hash(password, 6)
    await this.userRepository.create({ name, email, password_hash })
  }
}