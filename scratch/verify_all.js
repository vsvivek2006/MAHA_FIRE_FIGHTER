const puppeteer = require('puppeteer-core');
const path = require('path');
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

  console.log('1. Checking /blog ...');
  await page.goto('http://localhost:3000/blog', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/verify_blog_index.png', fullPage: false });
  console.log('Saved scratch/verify_blog_index.png');

  console.log('2. Checking /blog/nbc-fire-safety-guidelines-industrial-delhi-ncr ...');
  await page.goto('http://localhost:3000/blog/nbc-fire-safety-guidelines-industrial-delhi-ncr', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/verify_blog_post_hero.png', fullPage: false });
  
  // Scroll down to check .article-content and CTA
  await page.evaluate(() => window.scrollBy(0, 800));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/verify_blog_post_content.png', fullPage: false });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'scratch/verify_blog_post_cta.png', fullPage: false });
  console.log('Saved scratch/verify_blog_post_*.png');

  console.log('3. Logging in as admin ...');
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2' });
  await page.waitForSelector('input[name="email"], input[type="email"]');
  
  // Fill email and password if not filled
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

  // Click submit
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 2000));

  console.log('4. Checking /admin/blog ...');
  await page.goto('http://localhost:3000/admin/blog', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'scratch/verify_admin_blog_list.png', fullPage: false });
  console.log('Saved scratch/verify_admin_blog_list.png');

  console.log('5. Checking /admin/blog/new (Tiptap Editor) ...');
  await page.goto('http://localhost:3000/admin/blog/new', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.tiptap-editor-surface', { timeout: 10000 });
  await page.screenshot({ path: 'scratch/verify_tiptap_editor.png', fullPage: false });
  console.log('Saved scratch/verify_tiptap_editor.png');

  // Test typing in the editor
  await page.click('.tiptap-editor-surface');
  await page.keyboard.type('Testing the high-performance Tiptap rich text WYSIWYG editor for Maha Firefighters.');
  await page.screenshot({ path: 'scratch/verify_tiptap_typed.png', fullPage: false });
  console.log('Saved scratch/verify_tiptap_typed.png');

  await browser.close();
  console.log('ALL VERIFICATION COMPLETE!');
}

run().catch(console.error);
