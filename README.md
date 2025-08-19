# SentinelWatch Frontend 🚀

## Overview
SentinelWatch Frontend is a modern web application built with Nuxt.js, providing a robust and scalable solution for project management and user interactions.

## Prerequisites
- **Devbox**: Reproducible development environments
- **Node.js**: Managed by Devbox
- **pnpm**: Package manager

## Quick Start 🏁

### 1. Clone the Repository
```bash
git clone https://github.com/RunicEngines/SentinelWatch.git sentinel-watch-frontend
cd sentinel-watch-frontend/Frontend
```

### 2. Setup Development Environment
```bash
devbox shell
pnpm install
```

## Development Commands 💻
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |

## Project Structure 📂
```
sentinel-watch-frontend/
└── Frontend/
    ├── app/
    │   ├── assets/
    │   ├── components/
    │   ├── layouts/
    │   ├── pages/
    │   └── server/
    ├── public/
    └── package.json
```

## Designs & Diagrams 📊
The project includes several design assets and diagrams located in the `Docs` directory:
- `access.svg`: Access control diagrams
- `diagram(4).svg`: System architecture diagrams
- `environment.svg`: Environment configuration schemas
- `home.svg`: Homepage layout designs
- `Project.svg`: Project structure visualization
- `scopes.svg`: Authorization scope diagrams

These SVG files provide visual documentation of the system architecture, user flows, and component relationships. They can be viewed using any SVG-compatible viewer or modern web browser.

## Getting Started in 5 Steps
1. Clone the repository
2. Navigate to `Frontend` directory
3. Enter Devbox shell
4. Install dependencies
5. Start development server
```bash
git clone https://github.com/RunicEngines/SentinelWatch.git
cd sentinel-watch-frontend/Frontend
devbox shell
pnpm install
pnpm dev
```

## Development Workflow 🛠️
- Work inside Devbox shell
- Use `pnpm` for package management
- Follow Vue.js and Nuxt.js best practices

## Upcoming Features 🔜
- Comprehensive testing
- Enhanced linting
- Continuous integration setup

## Notes 📝
- All development occurs within the Devbox environment
- No additional local installations required
- Devbox manages Node.js and pnpm

## Application Access
- Development Server: `http://localhost:3000`

## Code Quality (Coming Soon)
```bash
# Linting (Not implemented yet)
pnpm lint
# Testing (Not implemented yet)
pnpm test
```

## License
AGPL-3.0 license
