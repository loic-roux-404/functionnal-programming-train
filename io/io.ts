import Logger from '../logger/index.ts'

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
    Logger.info(data);
  } catch (error) {
    console.error(error);
  }
}

async function readFile(file: string) {
  try {
    const data = await Deno.readTextFile(file);

    if (!data) {
      console.warn("\n\nFile " + file + " is empty, no function called\n");
      return "";
    }
    return data;
  } catch (error) {
    console.error(error);
    return "";
  }
}

function setTextToLine(text: string, line: Line) {
  return new Line(text);
}

function lowerCaseLine(line: Line) {
  return new Line(noUpperCase(false, line.getText()));
}

function removeUpperCaseFromLine(line: Line) {
  return new Line(noUpperCase(true, line.getText()));
}

function addTextToLine(text: string, line: Line) {
  return new Line(line.getText() + text);
}

function firstAndLastLetterUpper(line:Line) {
  return new Line(firstAndLastLetterUppercase(line.lineContent));
}

async function save(file: string, line: Line) {
  try {
    await Deno.writeTextFile(file, "\n"+line.getText(), { append: true });
    console.log("Line saved !");
  } catch (error) {
    console.error(error);
  }
}

class Line {
  public readonly lineContent: string;

  constructor(lineValue?: string) {
    this.lineContent = lineValue ? lineValue : "";
  }

  getText() {
    return this.lineContent;
  }
}


export { printFile, readFile, Line, firstAndLastLetterUppercase, countWordWithChars, countWordStartWith, countEachChar,noUpperCase, sortByKey, setTextToLine, lowerCaseLine, removeUpperCaseFromLine, addTextToLine, save, firstAndLastLetterUpper};
