# my-ollama-wrapper
Just a simple GUI for Ollama

## Features

- **Web-based GUI** - Access through your browser
- List all local Ollama models with detailed information
- View model metadata including size, modification date, and family
- Download new models from Ollama registry
- Delete models with confirmation dialogs
- Import models (placeholder for future implementation)
- Real-time status updates and notifications

## Requirements

- Python 3.6+
- Ollama running locally (default: http://localhost:11434)
- Flask web framework

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

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

## Interface

The web GUI provides:
- **Model List**: Table showing all installed models with:
  - Model name
  - File size (human-readable format)
  - Last modification date
  - Model family/type
- **Actions**:
  - **Refresh**: Update the model list
  - **Download Model**: Download a new model by name
  - **Import Model**: Import models (future feature)
  - **Delete Selected**: Remove selected model with confirmation
  - **Model Info**: View detailed information about selected model in a modal

## Features

### Model Management
- **List Models**: View all locally installed Ollama models
- **Download Models**: Pull new models from the Ollama registry
- **Delete Models**: Remove unwanted models with confirmation dialogs
- **Model Information**: View detailed metadata including modelfile, parameters, and templates

### User Experience
- Clean, responsive web interface
- Real-time status notifications
- Confirmation dialogs for destructive actions
- Modal popups for detailed model information
- Error handling with user-friendly messages

## API Endpoints

The application also provides REST API endpoints:
- `GET /api/models` - List all models
- `POST /api/download` - Download a model
- `POST /api/delete` - Delete a model  
- `GET /api/info/<model_name>` - Get model information

## Notes

- The application connects to Ollama on `http://localhost:11434` by default
- All destructive actions (like model deletion) require confirmation
- Long-running operations (download, delete) run in background threads
- The web interface provides real-time feedback for all operations
