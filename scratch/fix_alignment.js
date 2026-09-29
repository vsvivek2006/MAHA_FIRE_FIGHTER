const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    // target <p className="...">
    content = content.replace(/<p\s+className="([^"]*)"/g, (match, p1) => {
      if (p1.includes('text-center') || p1.includes('text-justify')) return match;
      // also ignore if it's very short text styling, but let's just add it to all <p>
      // wait, some <p> might be small captions. `text-justify` on small text is harmless or beneficial.
      return `<p className="${p1} text-justify"`;
    });
    
    // Some texts are in <div> tags, like descriptions. 
    // Usually they have text-gray-500, text-gray-600, etc.
    // Let's just do it for <p> tags first.

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated <p>: ${filePath}`);
    }
  }
});
