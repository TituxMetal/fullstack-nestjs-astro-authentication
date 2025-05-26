// Test file to verify path aliases work correctly
// This will be removed in Issue #9
import type { User } from '@auth-system/types'

import { main } from '~/main'

export const testImports = (): User => {
  main()
  return {
    id: String(1),
    email: 'test@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
