export class Email {
  private readonly value: string

  constructor(value: string) {
    if (!this.validate(value)) {
      throw new Error('Invalid email')
    }
    this.value = value
  }

  private validate(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }

  toString(): string {
    return this.value
  }
}
