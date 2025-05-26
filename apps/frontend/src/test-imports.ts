// Test file to verify path aliases work correctly
// This will be removed in Issue #9

import type { ApiResponse } from '@auth-system/types'
// import fs from 'fs'

import { main } from '~/main'

// const unused = 'this should trigger an error'
// console.log(fs.readFileSync('test.txt', 'utf8'))

export const testImports = (): ApiResponse<string> => {
  main()
  return {
    success: true,
    data: 'Frontend test',
    message: 'Path aliases working'
  }
}
