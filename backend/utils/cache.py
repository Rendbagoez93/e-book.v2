from functools import lru_cache
import json
import os

class Cache:
    def __init__(self, cache_size=128):
        self.cache_size = cache_size

    @lru_cache(maxsize=None)
    def get_cached_data(self, file_path):
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                return json.load(file)
        return None

    def clear_cache(self):
        self.get_cached_data.cache_clear()