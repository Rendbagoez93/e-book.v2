#!/usr/bin/env python3
"""
English A1 eBook - Main Entry Point
Run this file to start the Flask server for the eBook application
"""

import sys
import os

# Add backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.app import app

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Starting English A1 eBook Server")
    print("=" * 60)
    print("\n📚 Access your eBook at: http://localhost:5000")
    print("📊 API endpoints available at: http://localhost:5000/api")
    print("\n🔊 Audio generation enabled via gTTS")
    print("Press CTRL+C to stop the server\n")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
