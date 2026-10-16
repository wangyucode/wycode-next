# Project Guidelines

## Project Overview
- **Description**: 王郁/Wang Yu's personal blog project.
- **Tech Stack**: Next.js with static export.
- **Deployment**: Automatically deployed to `wycode.cn` via GitHub Actions.

## Development Principles
- **Keep it Simple**: As a personal project, maintain simplicity and avoid over-designing or over-engineering solutions.
- **Code Quality**: All code modifications must successfully pass both `lint` and `build` checks before completion.
- **Bump Version**: If `dev` branch is ready to merge to `main` bump the version in `package.json`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
