import { printFile, readFile, Line,firstAndLastLetterUppercase, countWordWithChars, countWordStartWith, noUpperCase,  countEachChar, sortByKey, setTextToLine, lowerCaseLine, removeUpperCaseFromLine, addTextToLine, save, firstAndLastLetterUpper} from "./io.ts";

Deno.test('New line et setText', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = setTextToLine("Nouveau contenu", newLine);
  console.log("New line : "+newLine.getText())
  save("./io/texte.txt", newLine);
});

Deno.test('New line + add text', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = addTextToLine(" 'text ajouté'", newLine);
  console.log("New line : "+newLine.getText())
  save("./io/texte.txt", newLine);
});

Deno.test('New lowercase line', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = lowerCaseLine(newLine);
  console.log("New line : "+newLine.getText())
  save("./io/texte.txt", newLine);
});

Deno.test('New noUpperCase line', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = removeUpperCaseFromLine(newLine);
  console.log("New line : "+newLine.getText())
  save("./io/texte.txt", newLine);
});

Deno.test('First and last letter upperCase', () => {
  let newLine = new Line("Bonjour TEST nouvelle ligne");
  newLine = firstAndLastLetterUpper(newLine);
  console.log("New line : "+newLine.getText())
  save("./io/texte.txt", newLine);
});

Deno.test('Print file', () => {
  printFile("./io/texte.txt");
});

Deno.test('Count char test', async ()=> {
  let data = await readFile("./io/texte.txt");
  const charCountResult = sortByKey(countEachChar(data));
  console.log(charCountResult)
})

Deno.test('No upper case', async ()=> {
  let data = await readFile("./io/texte.txt");
  const result = noUpperCase(false, data);
  console.log(result)
})

Deno.test('No upper case (removed)', async ()=> {
  let data = await readFile("./io/texte.txt");
  const result = noUpperCase(true, data);
  console.log(result)
})

Deno.test('Count words start with "t"', async ()=> {
  let data = await readFile("./io/texte.txt");
  const result = countWordStartWith("t", data);
  console.log(result)
})

Deno.test('Count words with 5 chars', async ()=> {
  let data = await readFile("./io/texte.txt");
  const result = countWordWithChars(5, data);
  console.log(result)
})

Deno.test('First and last letter uppercase', async ()=> {
  let data = await readFile("./io/texte.txt");
  const result = firstAndLastLetterUppercase(data);
  console.log(result)
})


