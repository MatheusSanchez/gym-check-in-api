export class UserAlredyExistError extends Error {
  constructor() {
    super('E-mail already exists')
  }
}
