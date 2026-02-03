export class UserLoginDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static create(email: string, password: string): UserLoginDto {
    return new UserLoginDto(email, password);
  }
}
