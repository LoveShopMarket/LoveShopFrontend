import Result from '../utils/Result';

export class UserLoginDto {
  email: string;
  password: string;
  confirmPassword?: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  static create(email: string, password: string, confirmPassword?: string): Result<UserLoginDto> {
    const errors: Error[] = [];
    if (!email || email.trim() === '') {
      errors.push(new EmailError('Email не может быть пустым'))
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      errors.push(new EmailError('Некорректный email'));
    }
    if (!password || password.trim() === '') {
      errors.push(new PasswordError('Пароль не может быть пустым'));
    } 
    if (confirmPassword && password !== confirmPassword) {
      errors.push(new PasswordError('Пароли не совпадают'));
    }
    if (errors.length > 0) {
      return Result.fail<UserLoginDto>(errors);
    }
    return Result.ok(new UserLoginDto(email, password));
  }
}

export class EmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailError';
  }
}

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordError';
  }
}
