export class Password {
  private readonly value: string

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Password must be at least 8 characters long')
    }
    this.value = value
  }

  private validate(value: string): boolean {
    return value.length >= 8
  }

  toString(): string {
    return this.value
  }
}
