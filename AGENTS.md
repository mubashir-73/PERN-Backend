# PERN Backend Agent Guidelines

## Commands
- **Development**: `npm run dev` (uses tsx watch)
- **Type checking**: `tsc --noEmit` (strict TypeScript enabled)
- **Single test**: No test framework detected - add tests before implementing

## Code Style
- **Imports**: Use `.js` extensions for all imports (ES modules with verbatimModuleSyntax)
- **Types**: Strict TypeScript enabled with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`
- **Validation**: Use Zod schemas with fastify-type-provider-zod
- **Database**: Prisma ORM with PostgreSQL
- **Auth**: JWT with httpOnly cookies, use authGuard decorator
- **Error handling**: Try-catch blocks, return proper HTTP status codes
- **Structure**: Modular pattern - controller/service/schema/route files per feature
- **Naming**: camelCase for variables, PascalCase for types/functions