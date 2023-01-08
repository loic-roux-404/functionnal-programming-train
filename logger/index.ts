import { ConsoleHandler } from "https://deno.land/std@0.171.0/log/handlers.ts";
import {
  LevelName,
} from "https://deno.land/std@0.171.0/log/levels.ts";
import { Logger } from "https://deno.land/std@0.171.0/log/mod.ts";

let myLogger = new Logger("Default" || "Default Logger", "INFO", {
  handlers: [new ConsoleHandler("INFO")],
});

const setLogger = (level?: LevelName, name?: string) => {
  const finalLevel = level || "INFO";

  myLogger = new Logger(name || "Default Logger", finalLevel, {
    handlers: [new ConsoleHandler(finalLevel)],
  });

  return myLogger;
}

export default myLogger;

export { setLogger };
