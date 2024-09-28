// @ts-check
import { expect, test } from '@/../playwright/fixtures';

test.describe('Landing page tests', () => {

  test('shows audiolinx logo', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
  });

  test('shows audiolinx toggle', async ({ homePage }) => {
    await expect(homePage.themeToggle).toBeVisible();
    await expect(homePage.themeToggleIconDark).toBeVisible();
  });

  test('should toggle theme', async ({ homePage }) => {
    const toggleLabel = await homePage.themeToggleLabel;
    await toggleLabel.check();
    await expect(homePage.themeToggleIconLight).toBeVisible();
  });

  test('shows audiolinx titles', async ({ homePage }) => {
    await expect(homePage.homeTitle).toBeVisible();
    await expect(homePage.homeTitle).toHaveText('Share it!');

    await expect(homePage.homeSubtitle).toBeVisible();
    await expect(homePage.homeSubtitle).toHaveText('Enter details on any song and generate links for the most popular music streaming platforms. Give it a go!');
  });

  test('shows audiolinx form', async ({ homePage }) => {
    await expect(homePage.homeForm).toBeVisible();
    await expect(homePage.homeInputTrack).toBeVisible();
    await expect(homePage.homeInputArtist).toBeVisible();
    await expect(homePage.homeInputUrl).toBeVisible();
    await expect(homePage.homeFormSubmitButton).toBeVisible();
  });
});