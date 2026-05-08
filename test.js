const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  try {
    await page.goto('http://localhost:4200');
    console.log('Navigated to localhost:4200');
  } catch (e) {
    console.log('Could not navigate. Start server manually');
    await browser.close();
    return;
  }
  
  // Wait for Angular to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Click the Open Menu button
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
    console.log('Clicked menu button');
  } else {
    console.log('Button not found');
  }
  
  await new Promise(r => setTimeout(r, 500));
  const popup = await page.$('.moz-menu-popup');
  if (popup) {
     const isVisible = await popup.isIntersectingViewport();
     console.log('Popup is visible:', isVisible);
     const html = await page.evaluate(el => el.outerHTML, popup);
     console.log('HTML:', html);
  } else {
     console.log('Popup NOT found in DOM!');
  }
  
  await browser.close();
})();
