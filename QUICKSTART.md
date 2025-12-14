# Quick Start Guide - English A1 eBook

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
uv sync
```

### 2. Start the Server
```bash
python main.py
```

### 3. Open Your Browser
Navigate to: **http://localhost:5000**

---

## 📋 What's Working

✅ **Consolidated CSS** - Single base.css with CSS variables for theming
✅ **Fixed File Paths** - All relative paths corrected
✅ **Alpine.js Stores** - Properly registered and working
✅ **Backend API** - Flask server with CORS enabled
✅ **Static File Serving** - Configured for src directory
✅ **TTS Audio** - gTTS integration for pronunciation
✅ **Dependencies** - All installed via uv

---

## 🎯 Key Features

### Design Elements
- **Purple Background** with grid pattern overlay
- **Pink Content Cards** with rounded corners
- **Brown Navigation Bar** 
- **Spiral Binding Effect** on content cards
- **Page Navigation** widget (bottom right)

### Interactive Components
- **Alphabet Cards** - Click to select, play audio
- **Number Grid** - Numbers 1-10 with pronunciations
- **Color Swatches** - Circular swatches with color names

### Audio System
- **API Endpoint**: `/api/audio/generate?text=<word>`
- **Fallback**: Web Speech API if backend unavailable
- **Caching**: Audio files cached in `src/assets/audio/`

---

## 🔧 API Endpoints

### Lesson Content
```
GET /api/lessons/lesson-01
GET /api/lessons/lesson-01/letters
GET /api/lessons/lesson-01/numbers
GET /api/lessons/lesson-01/colors
```

### Audio Generation
```
GET /api/audio/generate?text=hello&lang=en
GET /api/audio/file/<filename>
POST /api/audio/clear-cache
```

---

## 📁 File Structure

```
src/
├── html/
│   ├── index.html              # Landing page
│   └── lessons/
│       └── lesson-01.html      # First lesson
├── css/
│   └── base.css               # Consolidated styles
├── js/
│   ├── alpine-init.js         # Store registration
│   └── components/
│       ├── alphabet-cards.js
│       ├── number-grid.js
│       └── color-picker.js
├── data/
│   └── lesson-01/
│       ├── letters.json
│       ├── numbers.json
│       └── colors.json
└── assets/
    └── audio/                 # Generated audio files

backend/
├── app.py                     # Flask app entry
├── routes/
│   ├── lessons.py            # Lesson endpoints
│   └── audio.py              # Audio endpoints
└── services/
    ├── content_service.py    # Content loading
    └── audio_service.py      # TTS generation
```

---

## 🎨 Customization

### Change Colors
Edit `src/css/base.css`:
```css
:root {
    --bg-primary: #7B68EE;      /* Purple background */
    --bg-secondary: #FFB6C1;    /* Pink cards */
    --bg-nav: #8B4513;          /* Brown navigation */
    --btn-primary: #FF6B6B;     /* Red buttons */
}
```

### Add New Lesson
1. Create `src/data/lesson-02/` folder
2. Add JSON files (letters.json, etc.)
3. Create `src/html/lessons/lesson-02.html`
4. Add route in `backend/routes/lessons.py`

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port 5000 is available
netstat -ano | findstr :5000

# Use different port
# Edit main.py: app.run(..., port=8000)
```

### Audio not working
- Check `src/assets/audio/` directory exists
- Ensure gTTS is installed: `uv add gtts`
- Check browser console for errors

### CSS not loading
- Check file paths in HTML files
- Ensure server is serving static files correctly
- Hard refresh browser (Ctrl+Shift+R)

---

## 📝 Testing

### Test Backend API
```bash
# Test lesson endpoint
curl http://localhost:5000/api/lessons/lesson-01/letters

# Test audio generation
curl "http://localhost:5000/api/audio/generate?text=hello"
```

### Test Frontend
1. Open http://localhost:5000
2. Click "START" button
3. Test alphabet cards
4. Click 🔊 buttons for audio
5. Select colors

---

## 🔄 Next Steps

1. **Add More Lessons** - Create lesson-02, lesson-03, etc.
2. **User Progress** - Track completed lessons
3. **Quizzes** - Add interactive exercises
4. **Animations** - Enhance UI with transitions
5. **Mobile Optimization** - Test on tablets/phones
6. **Offline Mode** - Implement service workers

---

## 💡 Tips

- Use **Alt+F5** to hard refresh and clear cache
- Check browser console (F12) for JavaScript errors
- Use browser DevTools to inspect network requests
- Test API endpoints with curl or Postman

---

## 📚 Resources

- [Alpine.js Documentation](https://alpinejs.dev/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [gTTS Documentation](https://gtts.readthedocs.io/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

---

**Happy Learning! 📚✨**
