#!/usr/bin/env python3
"""
E-Book Compiler
Compiles the e-book into a standalone HTML package that can run offline on any device.
All CSS, JavaScript, and JSON data are embedded into the HTML files.
"""

import os
import json
import shutil
import re
from pathlib import Path
from datetime import datetime


class EBookCompiler:
    def __init__(self, src_dir='src', output_dir='dist'):
        self.src_dir = Path(src_dir)
        self.output_dir = Path(output_dir)
        self.css_cache = {}
        self.js_cache = {}
        self.json_cache = {}
        
    def clean_output_dir(self):
        """Remove and recreate output directory"""
        if self.output_dir.exists():
            shutil.rmtree(self.output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        print(f"✅ Cleaned output directory: {self.output_dir}")
    
    def load_css(self, css_path):
        """Load and cache CSS content"""
        if css_path not in self.css_cache:
            full_path = self.src_dir / css_path
            if full_path.exists():
                with open(full_path, 'r', encoding='utf-8') as f:
                    self.css_cache[css_path] = f.read()
                print(f"✅ Loaded CSS: {css_path}")
            else:
                print(f"⚠️  CSS not found: {css_path}")
                self.css_cache[css_path] = ""
        return self.css_cache[css_path]
    
    def load_js(self, js_path):
        """Load and cache JavaScript content"""
        if js_path not in self.js_cache:
            full_path = self.src_dir / js_path
            if full_path.exists():
                with open(full_path, 'r', encoding='utf-8') as f:
                    self.js_cache[js_path] = f.read()
                print(f"✅ Loaded JS: {js_path}")
            else:
                print(f"⚠️  JS not found: {js_path}")
                self.js_cache[js_path] = ""
        return self.js_cache[js_path]
    
    def load_json(self, json_path):
        """Load and cache JSON data"""
        if json_path not in self.json_cache:
            full_path = self.src_dir / json_path
            if full_path.exists():
                with open(full_path, 'r', encoding='utf-8') as f:
                    self.json_cache[json_path] = f.read()
                print(f"✅ Loaded JSON: {json_path}")
            else:
                print(f"⚠️  JSON not found: {json_path}")
                self.json_cache[json_path] = "{}"
        return self.json_cache[json_path]
    
    def inline_css(self, html_content):
        """Replace CSS link tags with inline styles"""
        # Pattern: <link rel="stylesheet" href="/css/base.css">
        css_pattern = r'<link\s+rel="stylesheet"\s+href="([^"]+)">'
        
        def replace_css(match):
            css_href = match.group(1)
            # Remove leading slash
            css_path = css_href.lstrip('/')
            css_content = self.load_css(css_path)
            return f'<style>\n{css_content}\n</style>'
        
        return re.sub(css_pattern, replace_css, html_content)
    
    def inline_js(self, html_content):
        """Replace JS script tags with inline scripts"""
        # Pattern: <script src="/js/components/sentences.js"></script>
        js_pattern = r'<script\s+src="([^"]+)"(?:\s+defer)?></script>'
        
        def replace_js(match):
            js_src = match.group(1)
            # Skip external CDN scripts
            if js_src.startswith('http'):
                return match.group(0)
            # Remove leading slash
            js_path = js_src.lstrip('/')
            js_content = self.load_js(js_path)
            return f'<script>\n{js_content}\n</script>'
        
        return re.sub(js_pattern, replace_js, html_content)
    
    def embed_json_data(self, html_content, html_file):
        """Embed JSON data as inline script in HTML"""
        # Determine which lesson this HTML belongs to
        json_data_to_embed = {}
        
        filename = html_file.name.lower()
        
        # Lesson 01 files
        if 'alphabet' in filename or 'lesson-01' in filename:
            json_data_to_embed['letters'] = self.load_json('data/lesson-01/letters.json')
        if 'numbers' in filename or 'lesson-01' in filename:
            json_data_to_embed['numbers'] = self.load_json('data/lesson-01/numbers.json')
        if 'colors' in filename or 'lesson-01' in filename:
            json_data_to_embed['colors'] = self.load_json('data/lesson-01/colors.json')
        
        # Lesson 02 files
        if 'verbs' in filename or 'lesson-02' in filename:
            json_data_to_embed['verbs'] = self.load_json('data/lesson-02/verbs.json')
        if 'nouns' in filename or 'lesson-02' in filename:
            json_data_to_embed['nouns'] = self.load_json('data/lesson-02/nouns.json')
        if 'adjectives' in filename or 'lesson-02' in filename:
            json_data_to_embed['adjectives'] = self.load_json('data/lesson-02/adjectives.json')
        
        # Lesson 03 files
        if 'sentences' in filename or 'lesson-03' in filename:
            json_data_to_embed['sentences'] = self.load_json('data/lesson-03/sentences.json')
        
        # Create embedded data script
        if json_data_to_embed:
            embedded_script = '\n<script>\n// Embedded JSON data for offline use\n'
            embedded_script += 'window.EMBEDDED_DATA = {\n'
            for key, data in json_data_to_embed.items():
                embedded_script += f'  "{key}": {data},\n'
            embedded_script += '};\n'
            
            # Override fetch to use embedded data
            embedded_script += '''
// Override fetch for embedded data
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // Check if it's a local data request
  if (url.includes('/data/') || url.includes('/api/lessons/')) {
    return new Promise((resolve) => {
      let data = null;
      
      // Extract the data key from URL
      if (url.includes('letters')) data = window.EMBEDDED_DATA.letters;
      else if (url.includes('numbers')) data = window.EMBEDDED_DATA.numbers;
      else if (url.includes('colors')) data = window.EMBEDDED_DATA.colors;
      else if (url.includes('verbs')) data = window.EMBEDDED_DATA.verbs;
      else if (url.includes('nouns')) data = window.EMBEDDED_DATA.nouns;
      else if (url.includes('adjectives')) data = window.EMBEDDED_DATA.adjectives;
      else if (url.includes('sentences')) data = window.EMBEDDED_DATA.sentences;
      
      if (data) {
        resolve({
          ok: true,
          json: () => Promise.resolve(data)
        });
      } else {
        // Fallback to original fetch
        originalFetch.apply(this, arguments).then(resolve);
      }
    });
  }
  // Use original fetch for external resources
  return originalFetch.apply(this, arguments);
};
</script>
'''
            # Insert before closing head tag
            html_content = html_content.replace('</head>', embedded_script + '</head>')
        
        return html_content
    
    def fix_navigation_links(self, html_content, html_file):
        """Fix navigation links to work with standalone files based on file location"""
        # Determine if file is in lessons subdirectory
        rel_path = html_file.relative_to(self.src_dir / 'html')
        in_lessons = 'lessons' in rel_path.parts
        
        if in_lessons:
            # Files inside lessons/ folder
            # href="/" -> href="../index.html"
            html_content = html_content.replace('href="/"', 'href="../index.html"')
            # href="/lessons/xxx.html" -> href="xxx.html" (same folder)
            html_content = re.sub(r'href="/lessons/([^"]+)"', r'href="\1"', html_content)
        else:
            # Files in root (like index.html)
            # href="/" -> href="index.html"
            html_content = html_content.replace('href="/"', 'href="index.html"')
            # href="/lessons/xxx.html" -> href="lessons/xxx.html"
            html_content = re.sub(r'href="/lessons/', 'href="lessons/', html_content)
        
        return html_content
    
    def process_html_file(self, html_file):
        """Process a single HTML file"""
        print(f"\n📄 Processing: {html_file}")
        
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Apply transformations
        html_content = self.inline_css(html_content)
        html_content = self.inline_js(html_content)
        html_content = self.embed_json_data(html_content, html_file)
        html_content = self.fix_navigation_links(html_content, html_file)
        
        # Determine output path
        rel_path = html_file.relative_to(self.src_dir / 'html')
        output_file = self.output_dir / rel_path
        
        # Create output directory if needed
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Write processed HTML
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✅ Saved: {output_file}")
    
    def compile(self):
        """Compile the entire ebook"""
        print("=" * 60)
        print("📚 E-Book Compiler - Starting compilation...")
        print("=" * 60)
        
        # Clean output directory
        self.clean_output_dir()
        
        # Find all HTML files
        html_dir = self.src_dir / 'html'
        html_files = list(html_dir.glob('**/*.html'))
        
        print(f"\n📁 Found {len(html_files)} HTML files to process")
        
        # Process each HTML file
        for html_file in html_files:
            self.process_html_file(html_file)
        
        # Create README
        self.create_readme()
        
        print("\n" + "=" * 60)
        print("✅ Compilation complete!")
        print(f"📦 Output directory: {self.output_dir.absolute()}")
        print(f"🚀 Open {self.output_dir}/index.html to view the ebook")
        print("=" * 60)
    
    def create_readme(self):
        """Create README for the compiled package"""
        readme_content = f"""# English A1 eBook - Standalone Package

Compiled on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## How to Use

This is a standalone HTML package that can run offline on any device.

### Opening the eBook:

1. Simply open `index.html` in any modern web browser
2. All content works offline - no internet or server required
3. All CSS, JavaScript, and data are embedded in the HTML files

### Features:

- ✅ Fully offline - no internet connection needed
- ✅ Works on any device (PC, tablet, smartphone)
- ✅ All lessons included (Alphabet, Numbers, Colors, Words, Sentences)
- ✅ Interactive components work without a backend
- ✅ Audio playback using Web Speech API (browser feature)

### Browser Compatibility:

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

### Sharing:

You can share this entire folder (or zip it) with anyone.
They just need to extract and open `index.html`.

---

Enjoy learning English! 📚
"""
        
        readme_file = self.output_dir / 'README.md'
        with open(readme_file, 'w', encoding='utf-8') as f:
            f.write(readme_content)
        print(f"✅ Created README: {readme_file}")


def main():
    """Main entry point"""
    compiler = EBookCompiler(src_dir='src', output_dir='dist')
    compiler.compile()


if __name__ == '__main__':
    main()
