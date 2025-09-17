# My Ollama Wrapper

A simple and intuitive GUI wrapper for [Ollama](https://ollama.ai), making it easy to interact with local language models through a user-friendly interface.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Building](#building)
- [Development](#development)
- [Contributing](#contributing)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview

My Ollama Wrapper provides a graphical user interface for Ollama, allowing users to:

- Interact with local language models through a chat interface
- Manage and switch between different models
- Configure model parameters and settings
- View conversation history
- Export and import conversations

## Prerequisites

Before you begin, ensure you have the following installed:

### Required
- **Ollama**: Install from [https://ollama.ai](https://ollama.ai)
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)

### Recommended
- **Git**: For cloning the repository and contributing
- **VS Code**: For development (with recommended extensions)

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 4GB (8GB+ recommended for larger models)
- **Storage**: At least 2GB free space (more for model storage)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
cd my-ollama-wrapper
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Ollama

Ensure Ollama is running on your system:

```bash
# Start Ollama service
ollama serve

# Verify installation by listing available models
ollama list
```

If you don't have any models installed, download a recommended model:

```bash
# Install a lightweight model for testing
ollama pull llama2:7b
```

## Running the Application

### Development Mode

Start the application in development mode with hot reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### Production Mode

Build and start the optimized production version:

```bash
npm run build
npm start
```

### Desktop Application

To run as a desktop application using Electron:

```bash
npm run electron
```

## Building

### Build for Development

```bash
npm run build:dev
```

### Build for Production

```bash
npm run build
```

### Build Desktop Application

#### For Current Platform
```bash
npm run build:electron
```

#### For Specific Platforms
```bash
# Windows
npm run build:win

# macOS
npm run build:mac

# Linux
npm run build:linux

# All platforms
npm run build:all
```

Built applications will be available in the `dist/` directory.

### Docker Build

You can also run the application using Docker:

```bash
# Build the Docker image
docker build -t my-ollama-wrapper .

# Run the container
docker run -p 3000:3000 --network host my-ollama-wrapper
```

Note: Use `--network host` to allow the container to access Ollama running on the host system.

## Development

### Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Make your changes
6. Test your changes: `npm test`
7. Submit a pull request

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

### Recommended Development Tools

#### VS Code Extensions
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**

#### Environment Setup

Create a `.env.local` file in the project root for local development:

```env
# Ollama API Configuration
OLLAMA_HOST=http://localhost:11434
OLLAMA_API_TIMEOUT=30000

# Application Configuration
NEXT_PUBLIC_APP_NAME="My Ollama Wrapper"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Development Settings
NODE_ENV=development
DEBUG=true
```

## Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) file for detailed guidelines on:

- Code of conduct
- Development workflow
- Pull request process
- Coding standards
- Testing requirements

## Project Structure

```
my-ollama-wrapper/
├── src/                    # Source code
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── chat/          # Chat-related components
│   │   ├── models/        # Model management components
│   │   └── settings/      # Settings components
│   ├── pages/             # Next.js pages
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   │   ├── ollama/        # Ollama API integration
│   │   ├── storage/       # Local storage utilities
│   │   └── utils/         # General utilities
│   ├── styles/            # CSS and styling
│   ├── types/             # TypeScript type definitions
│   └── constants/         # Application constants
├── public/                # Static assets
├── docs/                  # Additional documentation
├── tests/                 # Test files
│   ├── components/        # Component tests
│   ├── integration/       # Integration tests
│   └── e2e/              # End-to-end tests
├── .github/               # GitHub workflows and templates
├── dist/                  # Built application (generated)
├── node_modules/          # Dependencies (generated)
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── jest.config.js         # Jest testing configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── Dockerfile             # Docker configuration
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md              # This file
```

### Key Directories Explained

- **`src/components/`**: Reusable React components organized by feature
- **`src/lib/ollama/`**: Core integration with Ollama API
- **`src/hooks/`**: Custom React hooks for state management and side effects
- **`src/types/`**: TypeScript interfaces and type definitions
- **`tests/`**: Comprehensive test suite including unit, integration, and E2E tests

## Troubleshooting

### Common Issues

#### Ollama Connection Issues

**Problem**: Cannot connect to Ollama service
**Solutions**:
1. Ensure Ollama is running: `ollama serve`
2. Check if Ollama is accessible: `curl http://localhost:11434/api/version`
3. Verify firewall settings allow connections to port 11434
4. Try restarting Ollama service

#### Port Already in Use

**Problem**: Development server fails to start due to port conflict
**Solutions**:
1. Find and kill the process using the port: `lsof -ti:3000 | xargs kill -9`
2. Use a different port: `PORT=3001 npm run dev`
3. Update your environment configuration

#### Build Failures

**Problem**: Build process fails
**Solutions**:
1. Clear node modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Clear Next.js cache: `rm -rf .next`
3. Check Node.js version compatibility
4. Ensure all dependencies are correctly installed

#### Model Loading Issues

**Problem**: Models fail to load or respond
**Solutions**:
1. Verify model is installed: `ollama list`
2. Test model directly: `ollama run <model-name>`
3. Check system resources (RAM/CPU usage)
4. Try a smaller model for testing

### Getting Help

If you encounter issues not covered here:

1. Check the [Issues](https://github.com/aubreyhayes47/my-ollama-wrapper/issues) page
2. Search for similar problems in closed issues
3. Create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - System information (OS, Node.js version, etc.)
   - Error messages and logs

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
