import { assertStringIncludes } from "https://deno.land/std@0.170.0/testing/asserts.ts"
import { printFile, readFile, Line,firstAndLastLetterUppercase, countWordWithChars, countWordStartWith, noUpperCase,  countEachChar, sortByKey, lowerCaseLine, removeUpperCaseFromLine, addTextToLine, save, firstAndLastLetterUpper, createLine} from "./io.ts";

Deno.test('New line et setText', async () => {
  const newLine = createLine("Nouveau contenu");
  console.log("New line : "+newLine.getLineContent())
  save("./io/texte.txt", newLine);
  assertStringIncludes(await readFile("./io/texte.txt"), "Nouveau contenu");
});

Deno.test('New line + add text', async () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = addTextToLine(" 'text ajouté'", newLine);
  console.log("New line : "+newLine.getLineContent())
  save("./io/texte.txt", newLine);
  assertStringIncludes(await readFile("./io/texte.txt"), "Bonjour TEST nouvelle ligne 'text ajouté'");
});

Deno.test('New lowercase line', async () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = lowerCaseLine(newLine);
  console.log("New line : "+newLine.getLineContent())
  save("./io/texte.txt", newLine);
  assertStringIncludes(await readFile("./io/texte.txt"), "bonjour test nouvelle ligne");
});

Deno.test('New noUpperCase line', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = removeUpperCaseFromLine(newLine);
  console.log("New line : "+newLine.getLineContent())
  save("./io/texte.txt", newLine);
});

Deno.test('First and last letter upperCase', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = firstAndLastLetterUpper(newLine);
  console.log("New line : "+newLine.getLineContent())
  save("./io/texte.txt", newLine);
});

Deno.test('Print file', () => {
  printFile("./io/texte.txt");
});

Deno.test('Count char test', async ()=> {
  const data = await readFile("./io/texte.txt");
  const charCountResult = sortByKey(countEachChar(data));
  console.log(charCountResult)
})

Deno.test('No upper case', async ()=> {
  const data = await readFile("./io/texte.txt");
  const result = noUpperCase(false, data);
  console.log(result)
})

Deno.test('No upper case (removed)', async ()=> {
  const data = await readFile("./io/texte.txt");
  const result = noUpperCase(true, data);
  console.log(result)
})

Deno.test('Count words start with "t"', async ()=> {
  const data = await readFile("./io/texte.txt");
  const result = countWordStartWith("t", data);
  console.log(result)
})

Deno.test('Count words with 5 chars', async ()=> {
  const data = await readFile("./io/texte.txt");
  const result = countWordWithChars(5, data);
  console.log(result)
})

Deno.test('First and last letter uppercase', async ()=> {
  const data = await readFile("./io/texte.txt");
  const result = firstAndLastLetterUppercase(data);
  console.log(result)
})


