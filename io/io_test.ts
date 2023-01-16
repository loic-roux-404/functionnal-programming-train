import { NewLine, readFile, tpReadInfos, printFile } from "./io.ts";

Deno.test('Io test', () => {
  const newLine = new NewLine("Bonjour TEST nouvelle ligne");
  newLine.addTextToLine(" encore du texte sur la nouvelle ligne");
  newLine.toLowerCase();
  newLine.firstAndLastLetterUpper();
  newLine.removeUpperCase();
  newLine.save("./texte.txt");

  // addLine("./texte.txt", "Bonjour TEST Majuscules, coucou")
  console.log("File after : ");
  printFile("./texte.txt");

  readFile("io/texte.txt", tpReadInfos);
  readFile("io/texte_vide.txt", tpReadInfos);
})
