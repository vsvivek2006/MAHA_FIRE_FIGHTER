const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) { 
      results.push(file);
    }
  });
  return results;
}
const files = walk('./src');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  content = content.replace(/<(a|Link)([^>]*?)>([^<]+?)<\/(a|Link)>/g, (match, tag1, attrs, text, tag2) => {
    if (attrs.includes('title=')) return match;
    changed = true;
    const cleanText = text.trim().replace(/[\"']/g, '').replace(/\n/g, ' ');
    if (!cleanText) return match; // skip empty
    return `<${tag1}${attrs} title="${cleanText}">${text}</${tag2}>`;
  });

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
