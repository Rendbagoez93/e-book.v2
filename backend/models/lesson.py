class Lesson:
    def __init__(self, title, letters, numbers, colors):
        self.title = title
        self.letters = letters
        self.numbers = numbers
        self.colors = colors

    def get_letters(self):
        return self.letters

    def get_numbers(self):
        return self.numbers

    def get_colors(self):
        return self.colors

    def to_dict(self):
        return {
            "title": self.title,
            "letters": self.letters,
            "numbers": self.numbers,
            "colors": self.colors
        }