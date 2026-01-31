const { test, expect } = require('@playwright/test');

/**
 * =====================================================
 * FULL TEST DATA SET – 34 CASES
 * =====================================================
 */
const scenarios = [

  // ===================== POSITIVE CASES (01–24) =====================

  { id: 'Pos_Fun_0001', 
    name: 'Simple Greeting', 
    input: 'oyaata kohomadha?',
     expected: 'ඔයාට කොහොමද?' },

 { id: 'Pos_Fun_0002', 
  name: 'Daily Action', 
  input: 'api gedara yanava',
  expected: 'අපි ගෙඩර යනව' },

  { id: 'Pos_Fun_0003',
     name: 'Simple Past',
      input: 'mama gedhara giyaa',
       expected: 'මම ගෙදර ගියා' },

  { id: 'Pos_Fun_0004',
     name: 'Negative Sentence',
      input: 'mama enna baehae',
       expected: 'මම එන්න බැහැ' },

{ id: 'Pos_Fun_0005',
  name: 'Polite Request',
  input: 'karunakarala balanna',
  expected: 'කරුනකරල බලන්න' },

{ id: 'Pos_Fun_0006',
  name: 'Imperative Command',
  input: 'vathura dhenna', 
  expected: 'වතුර දෙන්න' },

  { id: 'Pos_Fun_0007',
     name: 'Future Intent',
      input: 'heta mama enne',
       expected: 'හෙට මම එන්නෙ' },

{ id: 'Pos_Fun_0008',
  name: 'Plural Form',
  input: 'LAmayi dhennek innavaa',  
  expected: 'ළමයි දෙන්නෙක් ඉන්නවා' },

{ id: 'Pos_Fun_0009',
  name: 'Repeated Emphasis',
  input: 'hari hari lassanayi',  
  expected: 'හරි හරි ලස්සනයි' },

{ id: 'Pos_Fun_0010',
  name: 'Joined Words',
  input: 'gedhara yanavaa',  
  expected: 'ගෙදර යනවා' },

  { id: 'Pos_Fun_0011',
     name: 'Question Polite',
      input: 'kiyanna puLuvandha?',
       expected: 'කියන්න පුළුවන්ද?' },

  { id: 'Pos_Fun_0012',
     name: 'Pronoun They',
      input: 'eyaalaa vaeda karanavaa', 
      expected: 'එයාලා වැඩ කරනවා' },
      
  { id: 'Pos_Fun_0013',
     name: 'Place Name', 
     input: 'mama Kandy giyaa',
      expected: 'මම Kandy ගියා' },


{ id: 'Pos_Fun_0014',
  name: 'Brand Name',
  input: 'Samsung phone eka',
  expected: 'Samsung phone එක' },

  { id: 'Pos_Fun_0015',
  name: 'Currency Format',
  input: 'meka rs. 2500k',
  expected: 'මෙක rs. 2500ක්' },
  
  { id: 'Pos_Fun_0016',
     name: 'Time Format',
      input: 'udheeta 8.30ta enna',
       expected: 'උදේට 8.30ට එන්න' },

  { id: 'Pos_Fun_0017',
     name: 'Slang Usage', 
     input: 'avulak naee machaQQ', 
     expected: 'අවුලක් නෑ මචං' },

  { id: 'Pos_Fun_0018', 
    name: 'Complex Condition', 
    input: 'oyaata kaale thiyenavaa nam mama ennee', 
    expected: 'ඔයාට කාලෙ තියෙනවා නම් මම එන්නේ' },

  { id: 'Pos_Fun_0019',
     name: 'Office Sentence',
      input: 'heta office yanna thiyenavaa',
       expected: 'හෙට office යන්න තියෙනවා' },

  { id: 'Pos_Fun_0020', 
    name: 'Measurement Unit', 
    input: 'kiloo dhekak vitharayi', 
    expected: 'කිලෝ දෙකක් විතරයි' },

  { id: 'Pos_Fun_0021',
     name: 'Simple Thanks', 
     input: 'sthuuthi',
      expected: 'ස්තූති' },

  { id: 'Pos_Fun_0022',
     name: 'Conversation Reply',
      input: 'hari hoDHA vidhihak', 
      expected: 'හරි හොඳ විදිහක්' },

  { id: 'Pos_Fun_0023',
     name: 'Simple Love Phrase',
      input: 'oyaa hari lassanayi',
       expected: 'ඔයා හරි ලස්සනයි' },

  { id: 'Pos_Fun_0024',
     name: 'Instruction',
      input: 'mehema karanna',
       expected: 'මෙහෙම කරන්න' },

  // ===================== NEGATIVE / FALSE CASES (25–34) =====================

  

];

/**
 * =====================================================
 * TEST EXECUTION ENGINE
 * =====================================================
 */
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
