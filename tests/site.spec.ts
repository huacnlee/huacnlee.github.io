import { test, expect } from '@playwright/test';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

test('profile and works keep the requested content and remove the archive', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Jason Lee', exact: true })).toBeVisible();
  await expect(page.locator('.role')).toContainText('Technical VP');
  await expect(page.locator('main')).toContainText('formerly known as GPUI Component');
  await expect(page.getByRole('navigation')).not.toContainText('Blog');
  await expect(page.getByRole('navigation').getByRole('link', { name: 'Twitter', exact: true })).toHaveAttribute('href', 'https://x.com/huacnlee');
  await expect(page.locator('main')).toContainText('culture of Ruby and Rails');
  await expect(page.locator('main')).toContainText('Taobao, Alibaba, and Ant Financial');
  await page.getByRole('link', { name: 'Opensource', exact: true }).click();
  for (const name of ['GPUI Kit']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  for (const name of ['Omamail', 'Omasend', 'omarchy-mihoro', 'omarchy-which-key']) {
    await expect(page.locator('#page > ul').getByRole('link', { name, exact: true })).toBeVisible();
  }
  expect(errors).toEqual([]);
  expect(existsSync('dist/blog')).toBe(false);
  expect(existsSync('dist/atom.xml')).toBe(false);
  expect(existsSync('Gemfile')).toBe(false);
  expect(readdirSync('dist').filter((name) => name.endsWith('.html')).sort()).toEqual(['404.html', 'index.html']);
  expect(readFileSync('dist/sitemap-0.xml', 'utf8')).not.toContain('/blog');
  expect(readFileSync('dist/favicon.svg', 'utf8')).not.toMatch(/<text|\p{Script=Han}/u);
});

test('responsive bilingual layout and local assets work', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', (response) => { if (response.status() >= 400) failures.push(response.url()); });
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/work/', '/zh/', '/zh/work/']) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.locator('footer')).toHaveCount(0);
      await expect(page.getByRole('button', { name: /motion|动画/ })).toHaveCount(0);
    }
  }
  expect(failures).toEqual([]);
});

test('content remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4387/');
  await expect(page.getByRole('heading', { name: 'Jason Lee', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Opensource', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'GPUI Kit', exact: true })).toBeVisible();
  await expect(page.locator('footer')).toHaveCount(0);
  await context.close();
});


test('language links preserve the page and expose matching metadata', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: '切换到中文', exact: true }).click();
  await expect(page).toHaveURL('/zh/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.locator('main')).toContainText('我创建并维护');
  await expect(page.locator('main')).toContainText('Ruby、Rails 的文化');
  await expect(page.locator('main')).toContainText('淘宝、阿里巴巴和蚂蚁金服');
  await expect(page.locator('main')).toContainText('GPUI Shell');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://huacnlee.com/zh/');
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://huacnlee.com/');
  await page.getByRole('link', { name: 'Opensource', exact: true }).click();
  await expect(page).toHaveURL('/zh/work/');
  await expect(page.getByRole('heading', { name: '开源', exact: true })).toBeVisible();
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute('href', 'https://huacnlee.com/work/');
  await page.getByRole('link', { name: 'Switch to English', exact: true }).click();
  await expect(page).toHaveURL('/work/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'Opensource', exact: true })).toBeVisible();
  await expect(page.locator('link[hreflang="zh-CN"]')).toHaveAttribute('href', 'https://huacnlee.com/zh/work/');
});


test('reduced motion keeps content accessible without hero artwork', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/zh/');
  await expect(page.locator('canvas, hero-field, matrix-rain')).toHaveCount(0);
  expect(await page.locator('.intro h1').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await expect(page.locator('main')).toContainText('Ruby、Rails 的文化');
  await page.getByRole('link', { name: '查看我的开源作品', exact: false }).click();
  await expect(page).toHaveURL('/zh/work/');
  await expect(page.locator('.project')).toHaveCount(1);
  await expect(page.locator('.projects .eyebrow')).toHaveCount(0);
});


test('system color scheme switches the monochrome theme without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'light' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4387/');
  const palette = () => page.locator('body').evaluate(el => ({
    background: getComputedStyle(el).backgroundColor,
    color: getComputedStyle(el).color,
  }));
  expect(await palette()).toEqual({ background: 'rgb(250, 250, 250)', color: 'rgb(23, 23, 23)' });
  await page.emulateMedia({ colorScheme: 'dark' });
  expect(await palette()).toEqual({ background: 'rgb(9, 9, 9)', color: 'rgb(240, 240, 240)' });
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.role')).toHaveText('Technical VP at Longbridge');
  await context.close();
});

test('open source features documented contributions and thresholded star counts', async ({ page }) => {
  await page.goto('/work/');
  await expect(page.getByRole('link', { name: /Zed · April 2026/ })).toHaveAttribute('href', 'https://zed.dev/blog/community-champion-jason-lee');
  await expect(page.getByRole('heading', { name: 'Contributions', exact: true })).toBeVisible();
  const counts = await page.locator('.repo-stars').allTextContents();
  expect(counts.length).toBeGreaterThan(10);
  for (const count of counts) expect(count.trim()).toMatch(/^☆ \d+(\.\d)?k$/);
  await expect(page.locator('li').filter({ has: page.getByRole('link', { name: 'Omamail', exact: true }) }).locator('.repo-stars')).toHaveCount(0);
  await expect(page.locator('.featured-stars')).toContainText('14.2k');
});
