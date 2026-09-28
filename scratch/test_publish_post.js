const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function findChrome() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Users\\kk701\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('Chrome/Edge executable not found');
}

async function run() {
  const executablePath = await findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Capture console messages for full diagnostic visibility
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  console.log('1. Logging in to admin ...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    const emailInput = document.querySelector('input[type="email"]');
    const pwdInput = document.querySelector('input[type="password"]');
    if (emailInput) {
      emailInput.value = 'admin@mahafirefighters.com';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (pwdInput) {
      pwdInput.value = 'MahaFire@Admin#2026Secure!';
      pwdInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));

  console.log('2. Going to /admin/blog/new ...');
  await page.goto('http://localhost:3000/admin/blog/new', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.tiptap-editor-surface', { timeout: 10000 });

  console.log('3. Filling post form fields ...');
  const testTitle = 'Complete Industrial Fire Hydrant System Maintenance Checklist 2026';
  await page.type('input[placeholder*="NBC 2016 Fire Safety Norms"]', testTitle);
  
  const metaDesc = 'Statutory industrial fire hydrant maintenance checklist according to IS 3844 and NBC 2016 Part 4 for manufacturing units in Delhi NCR.';
  await page.type('textarea[placeholder*="search snippets"]', metaDesc);

  // Type tag
  await page.type('input[placeholder*="Add tags"]', 'fire-hydrant');
  await page.keyboard.press('Enter');

  // Type in Tiptap editor
  await page.click('.tiptap-editor-surface');
  await page.keyboard.type('Industrial fire hydrant installations provide the frontline water delivery backbone during commercial emergencies. Under IS 3844:1989 and NBC 2016 Part 4, monthly pressure verification and bi-annual discharge flow rate testing are legally required across Delhi NCR industrial parks.');

  console.log('4. Clicking Publish Post button specifically by text ...');
  const clicked = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const pubBtn = btns.find(b => b.textContent && b.textContent.includes('Publish Post'));
    if (pubBtn) {
      pubBtn.click();
      return true;
    }
    return false;
  });

  console.log('Clicked Publish Post:', clicked);
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: 'scratch/verify_after_publish.png', fullPage: false });

  console.log('5. Checking /admin/blog list to see if published post appears ...');
  await page.goto('http://localhost:3000/admin/blog', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'scratch/verify_admin_blog_with_post.png', fullPage: false });

  await browser.close();
  console.log('TEST COMPLETE!');
}

run().catch(console.error);
