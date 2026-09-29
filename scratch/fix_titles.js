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

  // Add title to Image tags if they have alt and don't have title
  content = content.replace(/<Image([^>]*?)alt=([\"'\{][^\"'\}]*?[\"'\}])([^>]*?)>/g, (match, p1, p2, p3) => {
    if (match.includes('title=')) return match;
    changed = true;
    const altVal = p2.replace(/^[\"']|[\"']$/g, '');
    if (p2.startsWith('{')) {
      return `<Image${p1}alt=${p2}${p3} title=${p2}>`;
    } else {
      return `<Image${p1}alt=${p2}${p3} title="${altVal}">`;
    }
  });

  // For links: Add title to <a> or <Link> based on aria-label
  content = content.replace(/<(a|Link)([^>]*?)aria-label=([\"'][^\"']+?[\"'])([^>]*?)>/g, (match, tag, p1, p2, p3) => {
    if (match.includes('title=')) return match;
    changed = true;
    return `<${tag}${p1}aria-label=${p2}${p3} title=${p2}>`;
  });

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Updated ' + f);
  }
});
