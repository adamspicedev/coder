# Bun Setup Guide

This project uses Bun as the JavaScript runtime and package manager. Bun is significantly faster than npm and provides a better development experience.

## Installing Bun

### macOS & Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows

```bash
# Using PowerShell
irm bun.sh/install.ps1 | iex

# Or using WSL
curl -fsSL https://bun.sh/install | bash
```

### Using npm (alternative)

```bash
npm install -g bun
```

## Verify Installation

```bash
bun --version
```

## Why Bun?

- **Speed**: 30x faster than npm for package installation
- **Runtime**: Built-in JavaScript runtime with TypeScript support
- **Compatibility**: Works with existing Node.js packages
- **Developer Experience**: Better error messages and faster development

## Project Commands

Once Bun is installed, you can use these commands:

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Run database operations
bun run db:generate
bun run db:migrate
bun run db:seed

# Run linting
bun run lint
```

## Migration from npm

If you're coming from npm, here are the equivalent commands:

| npm             | bun             |
| --------------- | --------------- |
| `npm install`   | `bun install`   |
| `npm run dev`   | `bun run dev`   |
| `npm run build` | `bun run build` |
| `npm run start` | `bun run start` |

## Troubleshooting

### If Bun is not found

Make sure to restart your terminal after installation, or add Bun to your PATH:

```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

### If packages fail to install

Try clearing the cache:

```bash
bun pm cache rm
bun install
```

## More Information

- [Bun Documentation](https://bun.sh/docs)
- [Bun GitHub](https://github.com/oven-sh/bun)
- [Bun vs npm comparison](https://bun.sh/docs/install)
