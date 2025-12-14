export const lessonStore = {
    currentLesson: null,
    lessons: {
        'lesson-01': {
            letters: [],
            numbers: [],
            colors: []
        }
    },
    setCurrentLesson(lessonId) {
        this.currentLesson = lessonId;
        this.loadLessonData(lessonId);
    },
    loadLessonData(lessonId) {
        // Fetch data for the specified lesson
        fetch(`/data/lesson-01/letters.json`)
            .then(response => response.json())
            .then(data => {
                this.lessons[lessonId].letters = data;
            });

        fetch(`/data/lesson-01/numbers.json`)
            .then(response => response.json())
            .then(data => {
                this.lessons[lessonId].numbers = data;
            });

        fetch(`/data/lesson-01/colors.json`)
            .then(response => response.json())
            .then(data => {
                this.lessons[lessonId].colors = data;
            });
    },
    getCurrentLessonData() {
        return this.lessons[this.currentLesson];
    }
};