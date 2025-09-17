#!/usr/bin/env python3
"""
Simple launcher for the Ollama Wrapper GUI
"""

import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from ollama_wrapper import main

if __name__ == "__main__":
    main()