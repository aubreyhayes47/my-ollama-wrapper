# My Ollama Wrapper

A simple, elegant GUI for Ollama built with Electron and React, providing a cross-platform desktop interface for interacting with Ollama models.

## Features

- 🖥️ Cross-platform desktop application (Windows, macOS, Linux)
- ⚡ Built with Electron and React for modern, responsive UI
- 🎨 Clean, intuitive interface for Ollama interactions
- 🔧 Easy setup and configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Ollama](https://ollama.ai/) installed and running on your system

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
   cd my-ollama-wrapper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

### Running in Development Mode

To run the application in development mode with hot reload:

```bash
# Start the development server (this will start both React dev server and Electron)
npm run electron-dev-start
```

Or run them separately:

```bash
# Terminal 1: Start the React development server
npm start

# Terminal 2: Start Electron (after React dev server is running)
npm run electron-dev
```

### Building for Production

1. **Build the React application:**
   ```bash
   npm run build
   ```

2. **Run the production Electron app:**
   ```bash
   npm run electron
   ```

### Packaging for Distribution

To create distributable packages for your platform:

```bash
npm run electron-pack
```

This will create platform-specific packages in the `dist-electron` directory.

## Project Structure

```
my-ollama-wrapper/
├── src/
│   ├── main/          # Electron main process
│   │   └── main.js    # Main Electron process file
│   └── renderer/      # React application
│       ├── App.js     # Main React component
│       ├── App.css    # Styles for main component
│       ├── index.js   # React entry point
│       └── index.css  # Global styles
├── public/
│   └── index.html     # HTML template
├── dist/              # Built React application
├── dist-electron/     # Electron distribution packages
├── webpack.config.js  # Webpack configuration
├── package.json       # Project configuration and dependencies
└── README.md         # This file
```

## Available Scripts

- `npm start` - Start React development server
- `npm run build` - Build React app for production
- `npm run electron` - Run Electron with built React app
- `npm run electron-dev` - Run Electron in development mode
- `npm run electron-dev-start` - Start both React dev server and Electron concurrently
- `npm run electron-pack` - Package the app for distribution

## Configuration

The application is configured to work with Ollama running on the default port (11434). You can modify the configuration in the source files as needed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/) - Framework for building cross-platform desktop apps
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Ollama](https://ollama.ai/) - Run large language models locally
