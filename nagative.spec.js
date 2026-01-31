const { test, expect } = require('@playwright/test');


const scenarios = [




  { id: 'Neg_Fun_0025', name: 'Heavy Typos', input: 'mmaa gddra ynw', expected: 'මම ගෙදර යනවා' },
  { id: 'Neg_Fun_0026', name: 'Joined Stress', input: 'mamagedharayanavaa', expected: 'මමගෙදරයනවා' },
  { id: 'Neg_Fun_0027', name: 'Wrong Letter Mapping', input: 'isthuthi', expected: 'ස්තූතියි' },
  { id: 'Neg_Fun_0028', name: 'Pure English', input: 'This is not singlish', expected: '' },
  { id: 'Neg_Fun_0029', name: 'Random Symbols', input: '@@@###', expected: '' },
  { id: 'Neg_Fun_0030', name: 'Mixed Tamil Word', input: 'mama sapadu kanna giyaa', expected: '' },
  { id: 'Neg_Fun_0031', name: 'Line Break Issue', input: 'mama inne\nColombo', expected: 'මම ඉන්නේ Colombo' },
  { id: 'Neg_Fun_0032', name: 'Emoji Handling', input: 'hari lassanai 😍', expected: 'හරි ලස්සනයි 😍' },
  { id: 'Neg_Fun_0033', name: 'Empty Input', input: '', expected: '' },
  { id: 'Neg_Fun_0034', name: 'Long Noise Input', input: 'aaaaabbbbbcccccdddddeeeee', expected: '' }

];


for (const scenario of scenarios) {
  test(`${scenario.id} | ${scenario.name}`, async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/');

    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputArea.fill('');
    if (scenario.input) {
      await inputArea.pressSequentially(scenario.input, { delay: 20 });
    }

    const outputDiv = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();
    await expect(outputDiv).not.toBeEmpty({ timeout: 10000 });

    const actualOutput = (await outputDiv.innerText()).trim();

    console.log('------------------------------------');
    console.log(`TC ID    : ${scenario.id}`);
    console.log(`Input    : ${scenario.input}`);
    console.log(`Expected : ${scenario.expected}`);
    console.log(`Actual   : ${actualOutput}`);
    console.log(
      `Result   : ${
        actualOutput === scenario.expected ? 'PASS ✅' : 'FAIL ❌'
      }`
    );
    console.log('------------------------------------');

    await page.screenshot({
      path: `screenshots/${scenario.id}.png`,
      fullPage: true
    });

    // Assertion Rules
    if (scenario.id.startsWith('Pos')) {
      expect(actualOutput).toBe(scenario.expected);
    } else {
      expect(actualOutput.length).toBeGreaterThan(0);
    }
  });
}
