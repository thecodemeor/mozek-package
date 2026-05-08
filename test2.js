const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200');
  
  await new Promise(r => setTimeout(r, 2000));
  
  const buttons = await page.$$('moz-button');
  let menuBtn;
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Open Menu')) {
      menuBtn = btn;
      break;
    }
  }

  if (menuBtn) {
    await menuBtn.click();
  }
  
  await new Promise(r => setTimeout(r, 500));
  const popup = await page.$('.moz-menu-popup');
  if (popup) {
     const className = await page.evaluate(el => el.className, popup);
     const style = await page.evaluate(el => el.getAttribute('style'), popup);
     const rect = await page.evaluate(el => {
       const r = el.getBoundingClientRect();
       return { left: r.left, top: r.top, width: r.width, height: r.height };
     }, popup);
     console.log('CLASS:', className);
     console.log('STYLE:', style);
     console.log('RECT:', rect);
  }
  
  await browser.close();
})();
