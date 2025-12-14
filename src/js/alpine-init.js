// Alpine.js initialization and store registration
// This file sets up all Alpine.js stores and global configurations

document.addEventListener('alpine:init', () => {
    // UI Store for managing UI state
    Alpine.store('uiStore', {
        isNavOpen: false,
        isFooterVisible: true,
        currentTheme: 'default',
        
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        
        showFooter() {
            this.isFooterVisible = true;
        },
        
        hideFooter() {
            this.isFooterVisible = false;
        },
        
        setTheme(theme) {
            this.currentTheme = theme;
            // Apply theme changes via CSS variables
            document.documentElement.setAttribute('data-theme', theme);
        }
    });

    // Lesson Store for managing lesson data
    Alpine.store('lessonStore', {
        currentLesson: null,
        lessons: {},
        
        setCurrentLesson(lessonId) {
            this.currentLesson = lessonId;
        },
        
        getLessonData(lessonId) {
            return this.lessons[lessonId] || null;
        }
    });

    // Register uiStore as a component for direct usage in x-data
    Alpine.data('uiStore', () => ({
        isNavOpen: false,
        
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        }
    }));
});