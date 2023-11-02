import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlredyExistError } from './errors/userAlreadyExistsError'

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
      throw new UserAlredyExistError()
    }

    const password_hash = await hash(password, 6)
    const newUser = await this.userRepository.create({
      name,
      email,
      password_hash,
    })

    return { newUser }
  }
}
