# Ollama Wrapper

A simple, user-friendly GUI for managing your Ollama instance with comprehensive settings and configuration management.

## Features

### 🏠 Home Dashboard
- Connection status indicator with real-time feedback
- Quick connection testing to your Ollama server
- Clean, intuitive interface

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

### 🔧 Advanced Features
- **Local Storage Persistence** - All settings are saved locally and persist between sessions
- **Input Validation** - Real-time validation with helpful error messages
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Theme Support** - Multiple themes including system preference detection

## Getting Started

### Prerequisites
- A running Ollama instance (default: `http://localhost:11434`)
- A modern web browser

### Running the Application

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
   cd my-ollama-wrapper
   ```

2. **Serve the files using any HTTP server**
   
   Using Python (recommended):
   ```bash
   python3 -m http.server 8000
   ```
   
   Using Node.js:
   ```bash
   npx http-server .
   ```
   
   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser**
   ```
   http://localhost:8000
   ```

### First Time Setup

1. **Navigate to Settings** - Click the "Settings" button in the top navigation
2. **Configure Ollama Server** - Set your Ollama server URL (default is usually correct)
3. **Customize Preferences** - Choose your preferred theme and options
4. **Save Settings** - Click "Save Settings" to persist your configuration
5. **Test Connection** - Return to Home and click "Test Connection"

## Usage

### Managing Settings

**Server Configuration:**
- **Server URL**: Point to your Ollama instance (e.g., `http://localhost:11434`)
- **API Timeout**: How long to wait for server responses (default: 30 seconds)
- **Max Retries**: Number of connection attempts before giving up (default: 3)

**Application Preferences:**
- **Theme**: Choose between Light, Dark, or Auto (follows system preference)
- **Auto-connect**: Automatically test connection when the app loads
- **Save Logs**: Enable connection logging for troubleshooting
- **Model Cache**: Configure cache size for better performance

### Settings Persistence

All settings are automatically saved to your browser's local storage and will persist between sessions. You can:
- **Save Settings**: Manually save current configuration
- **Reset to Defaults**: Restore all settings to their original values

### Validation & Error Handling

The application includes comprehensive validation:
- **URL Validation**: Ensures server URLs are properly formatted
- **Range Validation**: Checks that numeric values are within acceptable ranges
- **Real-time Feedback**: Shows validation errors as you type
- **Connection Testing**: Validates server connectivity with detailed error messages

## Technical Details

### Architecture
- **Frontend Only**: Pure HTML, CSS, and JavaScript - no backend required
- **Local Storage**: Settings persisted using browser's localStorage API
- **Responsive Design**: CSS Grid and Flexbox for optimal layout
- **Modern JavaScript**: ES6+ features with graceful degradation

### Browser Compatibility
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
├── index.html          # Main application file
├── styles.css          # All styling and themes
├── script.js           # Application logic and settings management
└── README.md           # This documentation
```

## Contributing

This is a simple, self-contained project. To contribute:

1. Fork the repository
2. Make your changes
3. Test thoroughly across different browsers
4. Submit a pull request

## License

Licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.
