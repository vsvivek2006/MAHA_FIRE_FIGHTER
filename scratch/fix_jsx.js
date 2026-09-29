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

  if (content.includes('title="{')) {
    content = content.replace(/title="(\{.*?\})"/g, 'title=$1');
    changed = true;
  }
  
  if (content.includes('aria-label="{')) {
    content = content.replace(/aria-label="(\{.*?\})"/g, 'aria-label=$1');
    changed = true;
  }

  // Also fix links that got `<Link ...> <Image ...> </Link>` and thus their inner text was empty or had React components
  // The report said `Title: /` for 11 links.
  // This likely means they either didn't have title, or had a bad one.
  // Actually, wait, the SEO report output says:
  // `[/services] Title: /`
  // `[/fire-alarm-system-installation] Title: /`
  // If the title is `/`, it means they still have no title! The SEO tool outputs `/` when it's missing.
  // Let's add titles to those explicit links if they are still missing them.
  // In `Header.tsx`, they are dynamically generated. Let's look at `Header.tsx` again.

  if (changed) {
    fs.writeFileSync(f, content);
    console.log('Fixed JSX interpolation in ' + f);
  }
});
