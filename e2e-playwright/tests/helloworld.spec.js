const { test, expect, chromium } = require("@playwright/test");

test(`Test for title of the main route "/"`, async ({ page }) => {
  await page.goto("/");
  const pageTitle = await page.title();
  expect(pageTitle).toBe("Home");
});

test(`Test for title of the list route "/lists"`, async ({ page }) => {
  await page.goto("/lists");
  const pageTitle = await page.title();
  expect(pageTitle).toBe("Shopping Lists");
});

test(`Test for creating the shopping list at route "/lists"`, async ({ page }) => {
  await page.goto("/lists");
  await page.fill('input[name="name"]', "Shopping List by Test");
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]'),
  ]);
  expect(await page.innerText("body")).toContain("Shopping List by Test");
});

test(`Test for title of the list route "/lists/:id"`, async ({ page }) => {
  await page.goto("/lists/1");
  const pageTitle = await page.title();
  expect(pageTitle).toBe("Shopping List by Test");
});

test(`Test for creating the shopping list item at route "/lists/:id"`, async ({ page }) => {
  await page.goto("/lists/1");
  await page.fill('input[name="name"]', "List Item by Test");
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]'),
  ]);
  expect(await page.innerText("body")).toContain("List Item by Test");
});





