# English A1 eBook Project

## Overview
This project is an interactive eBook designed for English learners at level A1. It focuses on the first lesson, which introduces letters, numbers, and colors. The eBook is built using HTML, CSS, Alpine.js for interactivity, and Python Flask for backend services with gTTS for audio pronunciation.

## Features
- 🎨 Beautiful, layered design with purple background, pink content cards, and brown navigation
- 📝 Interactive alphabet cards with pronunciations
- 🔢 Number grid (1-10) with audio support
- 🎨 Color swatches with hex codes
- 🔊 Text-to-speech audio generation using Google TTS
- 📱 Responsive design for mobile and desktop
- 🎯 Modular and scalable architecture

## Project Structure
```
e-book.v2/
├── src/                        # Frontend source files
│   ├── html/                   # HTML pages
│   │   ├── index.html          # Main landing page
│   │   ├── lessons/            # Lesson pages
│   │   │   └── lesson-01.html  # First lesson
│   │   └── components/         # Reusable HTML components
│   ├── css/                    # Stylesheets
│   │   └── base.css           # Consolidated CSS with theme variables
│   ├── js/                     # JavaScript files
│   │   ├── alpine-init.js      # Alpine.js initialization & stores
│   │   └── components/         # Alpine.js components
│   ├── assets/                 # Static assets
│   │   ├── audio/             # Generated audio files
│   │   └── fonts/             # Custom fonts
│   └── data/                   # JSON data files
│       └── lesson-01/          # Lesson 01 data
│           ├── letters.json
│           ├── numbers.json
│           └── colors.json
├── backend/                    # Backend application
│   ├── app.py                 # Flask application entry point
│   ├── routes/                # API routes
│   │   ├── lessons.py         # Lesson content endpoints
│   │   └── audio.py           # Audio generation endpoints
│   ├── services/              # Business logic
│   │   ├── content_service.py # Content retrieval service
│   │   └── audio_service.py   # Text-to-speech service
│   ├── models/                # Data models
│   │   └── lesson.py
│   └── utils/                 # Utility functions
│       └── cache.py
├── tests/                     # Test files
│   ├── backend/
│   └── frontend/
├── main.py                    # Main entry point
├── pyproject.toml            # Project configuration
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Python 3.8 or higher
- uv package manager (recommended) or pip

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd e-book.v2
```

2. Install dependencies using uv:
```bash
uv sync
```

Or using pip:
```bash
pip install -r requirements.txt
```

### Running the Application

1. Start the Flask server:
```bash
python main.py
```

Or with uv:
```bash
uv run python main.py
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

3. The eBook will load with the landing page. Click "START" to begin Lesson 01.

## API Endpoints

### Lesson Content
- `GET /api/lessons/lesson-01` - Get all lesson 01 content
- `GET /api/lessons/lesson-01/letters` - Get letters data
- `GET /api/lessons/lesson-01/numbers` - Get numbers data
- `GET /api/lessons/lesson-01/colors` - Get colors data

### Audio Generation
- `GET /api/audio/generate?text=<word>&lang=en` - Generate audio for text
- `GET /api/audio/file/<filename>` - Retrieve generated audio file
- `POST /api/audio/clear-cache` - Clear old audio files

## Design Features

### Color Scheme
- **Primary Background**: Purple (#7B68EE) with grid pattern overlay
- **Content Cards**: Pink (#FFB6C1) with rounded corners and shadow
- **Navigation**: Brown (#8B4513) with white text
- **Accent**: Coral/Red (#FF6B6B) for buttons and highlights

### Interactive Elements
- Clickable cards for letters, numbers, and colors
- Audio playback buttons (🔊) for pronunciation
- Smooth hover effects and transitions
- Responsive grid layouts

## Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables) for theming
- **Alpine.js 3.x** - Reactive components and state management
- **Vanilla JavaScript** - No jQuery dependency

### Backend
- **Flask 3.1** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **gTTS** - Google Text-to-Speech for audio generation
- **Python 3.8+** - Backend language

## Development

### Adding New Lessons

1. Create new lesson data files in `src/data/lesson-XX/`
2. Create HTML page in `src/html/lessons/lesson-XX.html`
3. Add route in `backend/routes/lessons.py`
4. Update navigation links

### Customizing Themes

Edit CSS variables in `src/css/base.css`:
```css
:root {
    --bg-primary: #7B68EE;        /* Change primary background */
    --bg-secondary: #FFB6C1;      /* Change content card background */
    --bg-nav: #8B4513;            /* Change navigation color */
    --btn-primary: #FF6B6B;       /* Change button color */
}
```

### Running Tests

```bash
# Backend tests
pytest tests/backend/

# Frontend tests (manual)
# Open tests/frontend/lesson-01.spec.md for test cases
```

## Future Enhancements
- Add more lessons (Lesson 02, 03, etc.)
- Implement user progress tracking
- Add interactive quizzes and exercises
- Support multiple languages
- Add user authentication
- Implement offline mode with service workers
- Add animations and transitions

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Design inspiration from children's educational materials
- gTTS library for text-to-speech functionality
- Alpine.js for lightweight reactivity
- Flask for robust backend framework

## Support
For issues, questions, or suggestions, please open an issue on the project repository.