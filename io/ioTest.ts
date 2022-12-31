declare global {
  interface String {
    countWordStartWith(letter: string) : number;
    countWordWithChars(letter: number) : number;
  }
}

/* ARRAY RELATED OPERATIONS */
function sortByKey(arr: {[n: string]: any}) {
  const sorted: {[n: string]: any} = {};

  Object.keys(arr)
    .sort()
    .forEach(function (v, i) {
      sorted[v] = arr[v];
    });
  return sorted;
}

/* STR RELATED OPERATIONS */
function strToWordArray(str: string): string[] {
  return str.split(" ");
}

function strToLetterArray(str: string) {
  return str.split("");
}

function countEachChar(str: string) {
  const charArray: {[n: string]: number} = {};
  strToLetterArray(str).map((e) =>
    Object.keys(charArray).includes(e) ? (charArray[e] += 1) : (charArray[e] = 1)
  );
  return charArray;
}

String.prototype.countWordStartWith = function (letter: string) {
  return countWordStartWith(letter, this as string);
};

function countWordStartWith(letter: string, str: string) {
  return strToWordArray(str).filter((e) => e.charAt(0) === letter).length;
}

String.prototype.countWordWithChars = function (n: number) {
  return countWordWithChars(n, this as string);
}

function countWordWithChars(n: number, str: string) {
  return strToWordArray(str).filter((e) => e.length === n).length;
}

function removeUpperCase(str: string) {
  return str.replaceAll(/[A-Z]/g, "");
}

function noUpperCase(_removeUpperCase: boolean, str: string) {
  if (_removeUpperCase) {
    return removeUpperCase(str);
  } else {
    return str.toLowerCase();
  }
}

function firstAndLastLetterUppercase(str: string) {
  return str
    .split(" ")
    .map(
      (e) =>
        !!e &&
        e.charAt(0).toUpperCase() +
          e.slice(1, -1) +
          e[e.length - 1].toUpperCase()
    )
    .join(" ")
    .replaceAll(/e|E/g, "");
}

/* PRINT FUNCTIONS */
async function printFile(file: string) {
  try {
    const data = await Deno.readTextFile(file);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function readFile(file: string, callback: (data: string) => void) {
  try {
    const data = await Deno.readTextFile(file);

    if (data == "") {
      console.log("\n\nFile " + file + " is empty, no function called\n");
      return;
    }

    return callback(data);
  } catch (error) {
    console.error(error);
  }
}

class NewLine {
  public newLine?: string;

  constructor(lineValue?: string) {
    this.newLine = lineValue ? lineValue : "";
  }

  getText() {
    return this.newLine;
  }

  setTextToLine(text: string) {
    this.newLine = text;
  }

  addTextToLine(text: string) {
    this.newLine += text;
  }

  toLowerCase() {
    this.newLine = noUpperCase(false, this.newLine ?? "");
  }

  removeUpperCase() {
    this.newLine = noUpperCase(true, this.newLine ?? "");
  }

  firstAndLastLetterUpper() {
    this.newLine = firstAndLastLetterUppercase(this.newLine ?? "");
  }

  async save(file: string) {
    try {

      await Deno.writeTextFile(file, "\n" + this.newLine)
      console.log("Line saved !");
    } catch (error) {
      console.error(error);
    }
  }
}

// function addLine(file, lineText){
//    fs.appendFile(file, "\n"+lineText, function (err) {
//       if (err) throw err;
//       console.log('Line saved !');
//    });
// }

function tpReadInfos(data: string) {
  // console.log(data)
  const charCountResult = countEachChar(data);
  const sortedCharCount = sortByKey(charCountResult);
  const noUpperCaseData = noUpperCase(true, data);
  const lowerCaseData = noUpperCase(false, data);
  const startWithT = countWordStartWith("t", data);
  const onProtoStartWith = data.countWordStartWith("t");
  const word5char = countWordWithChars(5, data);
  const onProtoWithNChars = data.countWordWithChars(5);
  const firstAndLastUpper = firstAndLastLetterUppercase(data);

  console.log("Compteur caractères : ", sortedCharCount);
  console.log("Start with 't' : " + startWithT);
  console.log("onProto start with 't' : " + onProtoStartWith);
  console.log("Words with 5 letters : " + word5char);
  console.log("onProto with 5 letters : " + onProtoWithNChars);
  console.log("\nNo upperCase :\n" + noUpperCaseData);
  console.log("\nlowercase :\n" + lowerCaseData);
  console.log("\nfirstAndLastUpper :\n" + firstAndLastUpper);
}

function tpWriteFile() {
  const newLine = new NewLine("Bonjour TEST nouvelle ligne");
  newLine.addTextToLine(" encore du texte sur la nouvelle ligne");
  newLine.toLowerCase();
  newLine.firstAndLastLetterUpper();
  newLine.removeUpperCase();
  newLine.save("./texte.txt");

  // addLine("./texte.txt", "Bonjour TEST Majuscules, coucou")
  console.log("File after : ");
  printFile("./texte.txt");
}

function main() {
  tpWriteFile();

  readFile("io/texte.txt", tpReadInfos);
  readFile("io/texte_vide.txt", tpReadInfos);
}

main();
