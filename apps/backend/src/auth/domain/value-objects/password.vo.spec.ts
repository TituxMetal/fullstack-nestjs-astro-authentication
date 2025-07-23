import { Password } from './password.vo'

describe('Password Value Object', () => {
  it('should create a valid password', () => {
    const password = new Password('password123')

    expect(password).toBeInstanceOf(Password)
    expect(password.toString()).toBe('password123')
  })

  it('should throw an error for a password that is too short', () => {
    expect(() => new Password('1234567')).toThrow('Password must be at least 8 characters long')
  })
})
