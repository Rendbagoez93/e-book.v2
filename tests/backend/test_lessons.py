import unittest
from backend.app import app

class TestLessons(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = app.test_client()
        cls.app.testing = True

    def test_get_lesson_01(self):
        response = self.app.get('/api/lessons/lesson-01')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'letters', response.data)
        self.assertIn(b'numbers', response.data)
        self.assertIn(b'colors', response.data)

    def test_lesson_01_content_structure(self):
        response = self.app.get('/api/lessons/lesson-01')
        data = response.get_json()
        self.assertTrue('letters' in data)
        self.assertTrue('numbers' in data)
        self.assertTrue('colors' in data)
        self.assertIsInstance(data['letters'], list)
        self.assertIsInstance(data['numbers'], list)
        self.assertIsInstance(data['colors'], list)

if __name__ == '__main__':
    unittest.main()