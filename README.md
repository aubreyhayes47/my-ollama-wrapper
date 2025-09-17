# my-ollama-wrapper
Just a simple GUI for Ollama

## Features

- **Model Selection**: Choose from available Ollama models
- **Chat Interface**: Interactive console for sending prompts and receiving responses
- **Chat History**: Persistent conversation history during the session
- **Error Handling**: Clear error messages and status indicators
- **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- [Ollama](https://ollama.ai/) must be installed and running on your system
- Ollama should be accessible at `http://localhost:11434` (default)
- At least one model should be installed in Ollama (e.g., `ollama pull llama2`)

## Usage

1. Make sure Ollama is running:
   ```bash
   ollama serve
   ```

2. Open `index.html` in your web browser

3. Select a model from the dropdown (click "Refresh" if models don't load)

4. Start chatting by typing prompts in the text area and clicking "Send" or pressing Enter

5. Use "Clear History" to start a new conversation

## Installation

Simply clone this repository and open `index.html` in any modern web browser:

```bash
git clone https://github.com/aubreyhayes47/my-ollama-wrapper.git
cd my-ollama-wrapper
# Open index.html in your browser
```

## Troubleshooting

- **No models appear**: Ensure Ollama is running and you have models installed
- **Connection errors**: Check that Ollama is accessible at `http://localhost:11434`
- **CORS issues**: Some browsers may require serving the files from a local server rather than opening directly

## License

Licensed under the Apache License, Version 2.0
