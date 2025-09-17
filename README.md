# Ollama Wrapper GUI

A simple GUI application for managing your local Ollama server. This application provides an easy-to-use interface for checking server status and controlling the Ollama service.

## Features

- **Server Status Monitoring**: Real-time status checking with automatic refresh
- **Server Controls**: Start, stop, and restart the Ollama server
- **Model Information**: View available models and their details
- **User-Friendly Interface**: Clean GUI with visual status indicators
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Requirements

- Python 3.6 or higher
- Ollama installed on your system
- Required Python packages (see requirements.txt)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
   cd my-ollama-wrapper
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Make sure Ollama is installed on your system:
   - Visit [Ollama's official website](https://ollama.ai) for installation instructions

## Usage

### Running the Application

You can start the application in several ways:

1. **Using the main launcher**:
   ```bash
   python main.py
   ```

2. **Direct execution**:
   ```bash
   python ollama_wrapper.py
   ```

3. **Make executable** (Linux/macOS):
   ```bash
   chmod +x main.py
   ./main.py
   ```

### Using the Interface

1. **Server Status**: The application automatically checks the Ollama server status every 5 seconds
2. **Manual Refresh**: Click the "Refresh" button to manually check server status
3. **Server Controls**:
   - **Start Server**: Attempts to start the Ollama service
   - **Stop Server**: Stops the running Ollama service
   - **Restart Server**: Stops and then starts the Ollama service
4. **Auto-refresh**: Toggle automatic status monitoring on/off

### Server Information

The application displays:
- Current server status (Running/Stopped/Error)
- Server host and port
- Response time
- Available models and their sizes
- Last update timestamp

## Configuration

The application uses the default Ollama server address `http://localhost:11434`. This can be modified in the source code if needed.

## Troubleshooting

### Common Issues

1. **"Ollama executable not found"**: Make sure Ollama is installed and in your system PATH
2. **Connection refused**: Verify that Ollama is properly installed and the port 11434 is available
3. **Permission denied**: On Linux/macOS, you may need to run with appropriate permissions for system service control

### Server Control Commands

The application attempts to use these commands for server control:
- **Start**: `ollama serve`, `systemctl start ollama`
- **Stop**: `pkill -f ollama`, `systemctl stop ollama`, `killall ollama`
- **Restart**: Combination of stop and start commands

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.
