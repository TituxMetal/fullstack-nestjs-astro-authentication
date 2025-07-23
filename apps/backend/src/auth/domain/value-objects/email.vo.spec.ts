import { Email } from './email.vo'

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const email = new Email('test@example.com')

    expect(email).toBeInstanceOf(Email)
    expect(email.toString()).toBe('test@example.com')
  })

  it('should throw an error for an invalid email', () => {
    expect(() => new Email('invalid-email')).toThrow('Invalid email')
  })

  it('should throw an error for an email without a domain', () => {
    expect(() => new Email('test@')).toThrow('Invalid email')
  })

  it('should throw an error for an email without a user', () => {
    expect(() => new Email('@example.com')).toThrow('Invalid email')
  })
})
