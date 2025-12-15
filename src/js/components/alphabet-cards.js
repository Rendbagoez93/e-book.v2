// Alphabet Cards Component
// Manages the display and interaction of alphabet letter cards
// Enhanced to support A-Z with detailed information and audio playback

document.addEventListener('alpine:init', () => {
    Alpine.data('alphabetCards', () => ({
        letters: [],
        currentLetter: null,
        loading: false,
        audioQueue: [],
        isPlaying: false,
        
        init() {
            this.fetchLetters();
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.currentLetter) {
                    this.clearSelection();
                } else if (e.key.match(/^[a-zA-Z]$/)) {
                    this.selectLetterByKey(e.key.toUpperCase());
                }
            });
        },
        
        async fetchLetters() {
            this.loading = true;
            console.log('🔄 Starting to fetch letters...');
            try {
                // Try API first
                console.log('📡 Fetching from API: /api/lessons/lesson-01/letters');
                const response = await fetch('/api/lessons/lesson-01/letters');
                const data = await response.json();
                console.log('📦 API Response:', data);
                this.letters = data.letters || data;
                console.log('✅ Loaded letters from API. Total:', this.letters.length);
                console.log('📋 First letter:', this.letters[0]);
            } catch (error) {
                console.error('❌ Error fetching letters from API:', error);
                // Fallback to local JSON data
                try {
                    console.log('📡 Trying local fallback: /data/lesson-01/letters.json');
                    const response = await fetch('/data/lesson-01/letters.json');
                    const data = await response.json();
                    console.log('📦 Local Response:', data);
                    this.letters = data.letters || data;
                    console.log('✅ Loaded letters from local JSON. Total:', this.letters.length);
                } catch (localError) {
                    console.error('❌ Error fetching local letters:', localError);
                    // Last resort: generate basic alphabet
                    this.generateBasicAlphabet();
                }
            } finally {
                this.loading = false;
                console.log('🏁 Fetch complete. Letters array:', this.letters);
            }
        },
        
        generateBasicAlphabet() {
            // Fallback method to generate basic A-Z if data cannot be loaded
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            this.letters = alphabet.map(letter => ({
                letter: letter,
                pronunciation: `/${letter.toLowerCase()}/`,
                description: `Letter ${letter}`,
                exampleWord: `Word starting with ${letter}`,
                exampleImage: '📖'
            }));
            console.log('Generated basic alphabet');
        },
        
        selectLetter(letter) {
            this.currentLetter = letter;
            console.log('Selected letter:', letter);
            // Auto-play letter sound when selected
            this.playAudio(letter.letter);
        },
        
        selectLetterByKey(key) {
            const letter = this.letters.find(l => l.letter === key);
            if (letter) {
                this.selectLetter(letter);
            }
        },
        
        clearSelection() {
            this.currentLetter = null;
        },
        
        async playAudio(text) {
            if (this.isPlaying) {
                console.log('Audio already playing, queuing:', text);
                return;
            }
            
            this.isPlaying = true;
            
            try {
                // Try API endpoint first
                const response = await fetch(`/api/audio/generate?text=${encodeURIComponent(text)}`);
                const data = await response.json();
                
                if (data.audio_url) {
                    const audio = new Audio(data.audio_url);
                    audio.onended = () => { this.isPlaying = false; };
                    audio.onerror = () => { this.isPlaying = false; this.fallbackToSpeech(text); };
                    await audio.play();
                    return;
                }
            } catch (error) {
                console.error('Error with API audio:', error);
            }
            
            // Fallback to Web Speech API
            this.fallbackToSpeech(text);
        },
        
        fallbackToSpeech(text) {
            if ('speechSynthesis' in window) {
                // Cancel any ongoing speech
                speechSynthesis.cancel();
                
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.8; // Slightly slower for clarity
                utterance.pitch = 1.2; // Slightly higher pitch for engaging sound
                utterance.volume = 1.0;
                
                utterance.onend = () => {
                    this.isPlaying = false;
                };
                
                utterance.onerror = (error) => {
                    console.error('Speech synthesis error:', error);
                    this.isPlaying = false;
                };
                
                speechSynthesis.speak(utterance);
            } else {
                console.warn('Speech synthesis not supported');
                this.isPlaying = false;
            }
        },
        
        // Play all letters in sequence (useful for review)
        async playAllLetters() {
            for (const letter of this.letters) {
                await this.playAudio(letter.letter);
                await new Promise(resolve => setTimeout(resolve, 1500)); // Wait between letters
            }
        }
    }));
});