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
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/<Link([^>]*?)href="\/contact"([^>]*?)>/g, '<Link$1href="/contact" title="Contact Us"$2>');
  newContent = newContent.replace(/<Link href="\/" className="flex items-center gap-3">/g, '<Link href="/" className="flex items-center gap-3" title="Maha Firefighters Home">');
  if(content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed ' + file);
  }
});
