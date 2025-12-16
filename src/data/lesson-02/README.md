# Lesson 02: Words & Vocabulary

## Overview
Lesson 02 teaches students about three fundamental types of words in English: Verbs, Nouns, and Adjectives. This lesson helps students understand how to describe actions, name things, and describe qualities.

## Structure

### Three Main Components:

1. **Verbs (Action Words)** 
   - 20 common verbs
   - Categories: action, mental, communication, emotion
   - Each verb includes: word, pronunciation, definition, example, category, and emoji

2. **Nouns (Naming Words)**
   - 20 common nouns
   - Categories: object, furniture, vehicle, place, person, animal, technology, abstract
   - Types: countable and uncountable
   - Each noun includes: word, pronunciation, definition, example, category, type, and emoji

3. **Adjectives (Describing Words)**
   - 20 common adjectives
   - Categories: size, emotion, temperature, quality, speed, appearance, age, difficulty, condition, physical
   - Each adjective includes: word, pronunciation, definition, example, category, opposite, and emoji

## Features

### Interactive Elements:
- Click on any word card to see detailed information
- Audio playback for pronunciation (via Web Speech API or backend TTS)
- Filter by category to focus on specific word types
- Keyboard navigation (ESC to close modals)

### Visual Design:
- Clean card-based layout
- Emojis for visual learning
- Color-coded cards
- Responsive design for all devices
- Hover effects and animations

## Files

### Data Files:
- `src/data/lesson-02/verbs.json` - Verb vocabulary data
- `src/data/lesson-02/nouns.json` - Noun vocabulary data
- `src/data/lesson-02/adjectives.json` - Adjective vocabulary data

### HTML Pages:
- `src/html/lessons/lesson-02.html` - Hub page with links to all three sections
- `src/html/lessons/verbs.html` - Verbs learning page
- `src/html/lessons/nouns.html` - Nouns learning page
- `src/html/lessons/adjectives.html` - Adjectives learning page

### JavaScript Components:
- `src/js/components/verbs.js` - Alpine.js component for verbs
- `src/js/components/nouns.js` - Alpine.js component for nouns
- `src/js/components/adjectives.js` - Alpine.js component for adjectives

### Backend Routes:
- `GET /api/lessons/lesson-02` - Get all lesson-02 content
- `GET /api/lessons/lesson-02/verbs` - Get verbs data
- `GET /api/lessons/lesson-02/nouns` - Get nouns data
- `GET /api/lessons/lesson-02/adjectives` - Get adjectives data

### CSS:
- `src/css/base.css` - Includes `.words-grid`, `.word-card`, `.word-detail-modal` styles

## Usage

### For Students:
1. Navigate to Lesson 2 from the home page
2. Choose Verbs, Nouns, or Adjectives
3. Browse the word cards
4. Click on any word to see detailed information
5. Use the audio button to hear pronunciations
6. Filter by category to focus on specific types

### For Developers:
The lesson follows a modular pattern:
```javascript
// Each component follows this structure:
Alpine.data('componentName', () => ({
    words: [],           // Array of word objects
    currentWord: null,   // Selected word for detail view
    loading: false,      // Loading state
    filterCategory: 'all', // Category filter
    
    init() { ... },      // Initialization
    fetchWords() { ... }, // Data fetching with API + fallback
    filteredWords() { ... }, // Computed filtered list
    selectWord() { ... }, // Word selection handler
    playAudio() { ... }  // Audio playback
}));
```

## Learning Objectives

### Students will be able to:
- Identify and use 20 common verbs
- Identify and use 20 common nouns
- Identify and use 20 common adjectives
- Understand word categories
- Recognize opposite adjectives
- Use words in example sentences
- Pronounce words correctly

## Extension Ideas

### Future Enhancements:
- Add quizzes to test knowledge
- Include word games (matching, fill-in-the-blank)
- Add more words to each category
- Include word combinations (adjective + noun, verb + noun)
- Add sentence building exercises
- Include audio recordings of native speakers
- Add visual illustrations alongside emojis
- Track student progress

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- High contrast colors
- Clear, readable fonts
- Audio support for pronunciation
- Visual and text-based learning

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Requires JavaScript enabled
- Web Speech API for audio fallback
