import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/infra/controllers/**/*.e2e-test.ts'],
  },
})
