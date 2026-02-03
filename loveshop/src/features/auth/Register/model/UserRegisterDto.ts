import { PasswordError } from "@/shared/Errors/PasswordError";
import {Result} from "@/shared/lib/Result";

export class UserRegisterDto {
  private constructor(
    public email: string,
    public password: string,
    public confirmPassword: string
  ) {}

  static create(email: string, password: string, confirmPassword: string): Result<UserRegisterDto> {
    const errors: Error[] = [];

    if (password !== confirmPassword) {
      errors.push(new PasswordError('Пароли не совпадают'));
      return Result.fail(errors);
    }
    return Result.ok(new UserRegisterDto(email, password, confirmPassword));
  }
}
