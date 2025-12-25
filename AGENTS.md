# AGENTS.md

This file contains guidelines for agentic coding agents working in this Nuxt 4 blog repository.

## Project Overview

This is a personal blog built with Nuxt 4, Vue 3, TypeScript, and Tailwind-style custom CSS. The project uses static site generation with content management through Nuxt Content.

## Available Commands

### Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally

### Linting & Code Quality
- `npm run lint` - Run all linters (JS + CSS) with auto-fix
- `npm run lint:js` - Run ESLint with auto-fix
- `npm run lint:css` - Run Stylelint with auto-fix
- `npm run lint-staged` - Run linters on staged files (used by pre-commit hook)

### Git Hooks
- `npm run prepare` - Install Husky git hooks
- `npm run commitlint` - Validate commit messages (conventional commits)

## Code Style Guidelines

### General Principles
- **No comments**: Add comments only if explicitly requested
- **Conciseness**: Keep responses under 4 lines unless detail is requested
- **Follow existing patterns**: Always examine similar files before implementing

### Vue Components

#### Structure
```vue
<script setup>
// Script setup first - no default export
definePageMeta({
  name: 'page-name',
})

const route = useRoute()
// Composables and reactive data
</script>

<template>
  <!-- Semantic HTML with accessibility in mind -->
</template>

<style scoped>
/* Scoped styles at the bottom */
</style>
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `BaseHeader.vue`, `PostMeta.vue`)
- **Pages**: kebab-case for folders, PascalCase for page meta names
- **Classes**: kebab-case or BEM-like `block--modifier` for modifiers
- **Props**: camelCase when defining, kebab-case when passing

#### Accessibility
- Use semantic HTML5 elements
- Include ARIA labels for navigation (`aria-label`)
- Use proper heading hierarchy
- Include skip-to-content links

### CSS & Styling

#### Organization
- CSS variables are defined in `/app/assets/css/variables.css`
- Global styles in `/app/assets/css/` directory
- Component-scoped styles within `<style scoped>` blocks
- Use CSS custom properties (variables) extensively

#### Class Patterns
- Global utility classes with `g-` prefix (e.g., `g-container`, `g-heading`)
- Component classes with descriptive names (e.g., `nav-list`, `header`)
- BEM-like modifiers with `--` syntax (e.g., `nav-item--active`)

#### Responsive Design
- Use custom media queries defined in `variables-custom-media.css`
- Mobile-first approach with `@media (--medium)` and `@media (--large)`

### TypeScript & JavaScript

#### Type Safety
- All new code should include proper TypeScript types
- Use Nuxt's auto-imported composables and utilities
- Define content schemas with Zod in `content.config.ts`

#### Import Organization
```typescript
// 1. Vue/Nuxt imports (auto-imported, rarely needed)
// 2. Third-party libraries
// 3. Local imports from components/utils
```

#### Error Handling
- Use Nuxt's built-in error handling with `error.vue`
- For async operations, use try/catch blocks
- Provide meaningful error messages without exposing sensitive data

### Content Management

#### Blog Posts
- Markdown files in `/content/` directory
- Frontmatter must include: `title`, `description`, `createdAt`, `tags`
- Use relative paths for internal links
- Optimize images for web (use Nuxt Image module)

#### Schema Validation
Content is validated by Zod schema in `content.config.ts`:
```typescript
{
  title: z.string(),
  description: z.string(), 
  createdAt: z.string(),
  tags: z.array(z.string()),
}
```

### Git Workflow

#### Commit Messages
Follow conventional commits format:
- `feat:` - New feature
- `fix:` - Bug fix  
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes (linting, formatting)

#### Pre-commit Hooks
- ESLint runs automatically on `*.{js,ts,vue,json,yml}`
- Stylelint runs on `*.{css,vue}`
- SVG optimization with SVGO for `*.svg`

### Testing

This project currently doesn't have automated tests. When adding tests:
- Check for existing test patterns first
- Ask the user for the preferred testing framework
- Follow Nuxt's testing recommendations

## Development Patterns

### Data Fetching
```typescript
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection('content').order('createdAt', 'DESC').all()
})
```

### SEO & Meta Tags
- Use Nuxt SEO module (`@nuxtjs/seo`)
- Define schema.org for structured data
- Include Open Graph and Twitter Card meta

### Performance
- Images are optimized with Nuxt Image (Cloudflare provider)
- Custom font loading with `@nuxtjs/fontaine`
- View transitions enabled for modern browsers

## Key Directories

- `/app/components/` - Vue components (Base* prefix for shared components)
- `/app/pages/` - File-based routing
- `/app/assets/css/` - Global styles and variables
- `/content/` - Blog post markdown files
- `/public/` - Static assets (favicons, images)
- `/server/` - Server-side routes (RSS generation)

## Tools Configuration

### ESLint
- Uses Nuxt's ESLint configuration with stylistic rules
- Auto-fix enabled in development

### Stylelint
- Extends: `stylelint-config-standard`, `stylelint-config-recess-order`
- Custom rule for kebab-case class patterns
- BEM-like modifier support with `--`

### PostCSS
- `postcss-preset-env` for CSS features
- `postcss-pxtorem` for responsive units
- Custom media queries from `variables-custom-media.css`

## Important Notes

- This is a personal blog - maintain professional tone in content
- No external APIs or databases (except for RSS generation)
- Static site generation - avoid dynamic features that break SSG
- Image optimization through Cloudflare CDN
- No authentication or user management needed