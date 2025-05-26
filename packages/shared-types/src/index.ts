// Shared types for the authentication system

// User-related types
export interface User {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDto {
  email: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface UpdateProfileDto {
  email?: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// Authentication types
export interface AuthTokens {
  accessToken: string
  refreshToken?: string
}

export interface AuthUser {
  id: string
  email: string
}
