export class UserLoginDTO {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static create(email: string, password: string): UserLoginDTO {
    return new UserLoginDTO(email, password);
  }
}
