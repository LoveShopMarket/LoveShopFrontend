export class Result<T> {
  private success: boolean;
  private errors: Error[];
  private value?: T;

  private constructor(isSuccess: boolean, errors: Error[], value?: T) {
    this.success = isSuccess;
    this.errors = errors ?? [];
    this.value = value;
  }

  static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, [], value);
  }

  static fail<U>(errors: Error[]): Result<U> {
    return new Result<U>(false, errors);
  }

  get isSuccess(): boolean {
    return this.success;
  }

  get getErrors(): Error[] {
    return this.errors;
  }

  get getValue(): T | undefined {
    return this.value;
  }
}

