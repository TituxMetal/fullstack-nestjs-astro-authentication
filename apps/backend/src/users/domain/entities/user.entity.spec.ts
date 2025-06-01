import { User } from './user.entity'

describe('User Entity', () => {
  it('should create a new user', () => {
    const user = new User('1', 'test@example.com', 'Secure123', new Date(), new Date())

    expect(user.getId()).toBe('1')
    expect(user.getEmail()).toBe('test@example.com')
    expect(user.getCreatedAt()).toBeInstanceOf(Date)
    expect(user.getUpdatedAt()).toBeInstanceOf(Date)

    expect(user.toResponse()).toEqual({
      id: '1',
      email: 'test@example.com',
      createdAt: user.getCreatedAt().toISOString(),
      updatedAt: user.getUpdatedAt().toISOString()
    })
  })

  it('should create a user with valid inputs', () => {
    const user = User.create('1', 'test@example.com', 'Secure123')

    expect(user).toBeDefined()
    expect(user.getEmail()).toBe('test@example.com')
  })
})
