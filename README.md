# my-ollama-wrapper
Just a simple GUI for Ollama

## Features

### Chat/Interaction Console
- **Model Selection**: Choose from available Ollama models
- **Interactive Chat**: Console for sending prompts to models and receiving responses
- **Chat History**: Persistent conversation history during the session
- **Real-time Responses**: Streaming responses with typing indicators
- **Error Handling**: Clear error messages and status indicators

### Model Management
- **Web-based GUI** - Access through your browser
- **Model List**: View all local Ollama models with detailed information
- **Model Metadata**: View model size, modification date, and family information
- **Download Models**: Pull new models from Ollama registry
- **Delete Models**: Remove models with confirmation dialogs
- **Model Information**: View detailed metadata including modelfile and parameters

### User Experience
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live status notifications and progress indicators
- **Multiple Interfaces**: Simple HTML version and Python Flask application
- **Confirmation Dialogs**: Safe model deletion and chat clearing
- **Modern UI**: Clean, professional interface with proper styling

## Installation Options

### Option 1: Simple Web Interface (Chat Console)
Simply clone this repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
cd my-ollama-wrapper
# Open index.html in your browser for chat functionality
# Open demo.html for demo mode without Ollama backend
```

### Option 2: Full Python Application (Model Management + Chat)
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

### Simple Chat Interface
1. Make sure Ollama is running:
   ```bash
   ollama serve
   ```

2. Open `index.html` in your web browser

3. Select a model from the dropdown (click "Refresh" if models don't load)

4. Start chatting by typing prompts in the text area and clicking "Send" or pressing Enter

5. Use "Clear History" to start a new conversation

### Full Python Application
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

## Interface Options

### Chat Console (index.html)
- Interactive chat interface with selected models
- Real-time conversation with typing indicators
- Message history with timestamps
- Simple model selection dropdown

### Model Management (Python Flask app)
- **Model List**: Table showing all installed models
- **Download Model**: Pull new models by name
- **Delete Selected**: Remove models with confirmation
- **Model Info**: View detailed model metadata in modals
- **API Endpoints**: REST API for programmatic access

## API Endpoints (Flask App)

- `GET /api/models` - List all models
- `POST /api/download` - Download a model
- `POST /api/delete` - Delete a model  
- `GET /api/info/<model_name>` - Get model information

## Troubleshooting

- **No models appear**: Ensure Ollama is running and you have models installed
- **Connection errors**: Check that Ollama is accessible at `http://localhost:11434`
- **CORS issues**: Some browsers may require serving the files from a local server rather than opening directly
- **Long operations**: Model downloads and deletions run in background threads

## License

Licensed under the Apache License, Version 2.0
