# my-ollama-wrapper

A comprehensive GUI for managing your Ollama instance with chat functionality, model management, and advanced settings configuration.

## Features

### 🤖 Chat/Interaction Console
- **Model Selection**: Choose from available Ollama models
- **Interactive Chat**: Console for sending prompts to models and receiving responses
- **Chat History**: Persistent conversation history during the session
- **Real-time Responses**: Streaming responses with typing indicators
- **Error Handling**: Clear error messages and status indicators

### 📦 Model Management
- **Web-based GUI** - Access through your browser
- **Model List**: View all local Ollama models with detailed information
- **Model Metadata**: View model size, modification date, and family information
- **Download Models**: Pull new models from Ollama registry
- **Delete Models**: Remove models with confirmation dialogs
- **Model Information**: View detailed metadata including modelfile and parameters

### 🖥️ Server Monitoring & Troubleshooting
- **Server Logs**: Real-time monitoring of Ollama server logs with filtering and auto-refresh
- **Error Monitor**: Comprehensive error tracking with severity levels (Critical, Error, Warning)
- **Troubleshooting Guide**: Built-in documentation for common issues and solutions
- **System Requirements**: Hardware and software requirement guidelines
- **Useful Commands**: Quick reference for Ollama commands and diagnostics

### ⚙️ Settings & Configuration
- **Ollama Server Settings**
  - Configurable server URL (supports any Ollama instance)
  - Adjustable API timeout (1-300 seconds)
  - Connection retry settings (0-10 retries)
- **Application Preferences**
  - Theme selection (Light, Dark, Auto-detect)
  - Auto-connect on startup option
  - Connection logging preferences
  - Model cache size configuration
- **Local Storage Persistence** - All settings are saved locally and persist between sessions
- **Input Validation** - Real-time validation with helpful error messages

### 🎨 User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live status notifications and progress indicators
- **Multiple Interfaces**: Web interface and Python Flask application
- **Confirmation Dialogs**: Safe model deletion and chat clearing
- **Modern UI**: Clean, professional interface with proper styling
- **Theme Support**: Multiple themes including system preference detection

## Installation Options

### Option 1: Simple Web Interface (Recommended)
Simply clone this repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
cd my-ollama-wrapper
# Open index.html in your browser for full functionality
# Open demo.html for demo mode without Ollama backend
```

### Option 2: Full Python Application (Advanced)
1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### Prerequisites
- [Ollama](https://ollama.ai/) must be installed and running on your system
- Ollama should be accessible at `http://localhost:11434` (default)
- At least one model should be installed in Ollama (e.g., `ollama pull llama2`)

### Web Interface (Recommended)
1. Make sure Ollama is running:
   ```bash
   ollama serve
   ```

2. Open `index.html` in your web browser

3. Navigate through the sidebar:
   - **Models**: View and manage your installed models
   - **Server**: Monitor server logs, errors, and get troubleshooting guidance

   - **Settings**: Configure server settings and app preferences
   - **About**: View application information

4. **First Time Setup**: 
   - Go to Settings to configure your Ollama server URL
   - Choose your preferred theme and options
   - Save settings to persist your configuration

### Python Flask Application
1. Make sure Ollama is running on your system
2. Run the application:
   ```bash
   python main.py
   ```
   or
   ```bash
   python ollama_manager.py
   ```
3. Open your browser and go to: http://localhost:5000

## Interface Features

### Models View
- Interactive table showing all installed models
- Model metadata display including size and family
- Download new models from Ollama registry
- Delete models with confirmation dialogs

### Settings View
- **Server Configuration**: URL, timeout, retry settings with validation
- **Application Preferences**: Theme, auto-connect, logging options
- **Persistent Storage**: All settings saved locally
- **Reset to Defaults**: Restore original configuration

### Server View
- **Server Logs**: Real-time log monitoring with color-coded levels and auto-refresh
- **Error Monitor**: Comprehensive error tracking with filtering by severity
- **Troubleshooting Guide**: Built-in documentation for common Ollama issues
- **Interactive Controls**: Refresh, clear, and filter functionality
- **System Requirements**: Hardware and software specifications
- **Command Reference**: Quick access to useful Ollama commands


## API Endpoints (Flask App)

- `GET /api/models` - List all models
- `POST /api/download` - Download a model
- `POST /api/delete` - Delete a model  
- `GET /api/info/<model_name>` - Get model information

## Technical Details

### Architecture
- **Frontend**: Modern HTML5, CSS3, and JavaScript (ES6+)
- **Backend Options**: Pure frontend or Python Flask application
- **Storage**: Browser localStorage for settings persistence
- **Responsive Design**: CSS Grid and Flexbox for optimal layout

### Browser Compatibility
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Troubleshooting

- **No models appear**: Ensure Ollama is running and you have models installed
- **Connection errors**: Check that Ollama is accessible at `http://localhost:11434`
- **Settings not saving**: Ensure localStorage is enabled in your browser
- **CORS issues**: Some browsers may require serving the files from a local server rather than opening directly
- **Long operations**: Model downloads and deletions run in background threads

## Contributing

1. Fork the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit a pull request

## License

Licensed under the Apache License, Version 2.0
