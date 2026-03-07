import { test, expect } from "@playwright/test";

test.describe("ホーム → ロードマップ → レッスン → 1問解答 → 次へ", () => {
  test("初回訪問でホームが表示され、ロードマップ経由でレッスンに進み1問解答できる", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /医療学習/ }).first()).toBeVisible();

    await page.getByRole("link", { name: /ロードマップ/ }).click();
    await expect(page).toHaveURL(/\/roadmap/);

    const firstSubjectLink = page.getByRole("link", { name: /細胞生物学|解剖学|生理学/ }).first();
    await firstSubjectLink.click();
    await expect(page).toHaveURL(/\/subjects\//);

    const lessonLink = page.getByRole("link", { name: /レッスン|レベル|LV\./ }).first();
    await lessonLink.click();
    await expect(page).toHaveURL(/\/lesson\//);

    const skipIntro = page.locator('[aria-label="タップでスキップ"]');
    await skipIntro.waitFor({ state: "visible", timeout: 2000 }).catch(() => {});
    if (await skipIntro.isVisible()) {
      await skipIntro.click();
    }
    await expect(page.getByText(/Q 1 \/ \d+/)).toBeVisible({ timeout: 15000 });
    const options = page.getByRole("button", { name: /選択肢 \d+:/ });
    await expect(options.first()).toBeVisible();
    await options.first().click();

    await expect(page.getByRole("button", { name: /次へ|結果を見る/ })).toBeVisible({
      timeout: 5000,
    });
    await page.getByRole("button", { name: /次へ|結果を見る/ }).click();

    const url = page.url();
    const isComplete = url.includes("/lesson/") && (await page.getByText(/Lesson Complete|完了|%/).isVisible());
    const isNextQuestion = await page.getByText(/Q 2 \/ \d+/).isVisible().catch(() => false);
    expect(isComplete || isNextQuestion).toBe(true);
  });
});

test.describe("復習ページ", () => {
  test("復習ページに遷移すると「復習は完了」またはクイズが表示される", async ({ page }) => {
    await page.goto("/review");
    await expect(
      page.getByText(/今日の復習は完了です|復習セッション|読み込み中/)
    ).toBeVisible({ timeout: 15000 });
  });
});

test.describe("ブラウズページ", () => {
  test("ブラウズで科目フィルタが表示され、レッスン一覧に遷移できる", async ({ page }) => {
    await page.goto("/browse");
    await expect(page.getByText(/科目|レッスン/)).toBeVisible();
    const lessonLink = page.getByRole("link", { name: /レッスン|レベル/ }).first();
    await lessonLink.click();
    await expect(page).toHaveURL(/\/(lesson|subjects)\//);
  });
});
