## Code Quality & Build Process ⚠️ ALWAYS Lint and Build

**You MUST run build and lint validation after EVERY code change:**
1. Run `pnpm build` to check for TypeScript compilation errors
2. Run `pnpm lint` to verify code quality and style
3. Fix ALL errors or warnings before completing work
4. Ensure the application compiles successfully before submitting changes

**Build and lint validation are REQUIRED for every code change to maintain production readiness. Do NOT skip these steps.**

## File Organization & Maintainability

**Always break down code if a class or file becomes too long.**
- Avoid having hundreds of lines in a single file when it can be split into smaller components or modules.
- Refactor large files into multiple, logically organized files to improve maintainability, debugging, and code review.
- Smaller files and components are easier to test, understand, and update.
