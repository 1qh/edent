import ts from 'typescript-eslint'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  { ignores: ['**/.*'] },
  ...ts.configs.stylistic,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        config: './tooling/tailwind/web.ts'
      }
    }
  }
]
