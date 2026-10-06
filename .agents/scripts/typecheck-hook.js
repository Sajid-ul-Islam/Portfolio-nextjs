// Node.js hook handler for Antigravity Lifecycle Hooks
// Receives JSON input via stdin, executes TypeScript check on TS/TSX edits, outputs {} on stdout

const { execSync } = require("child_process");
const fs = require("fs");

function main() {
  let inputData = "";
  try {
    inputData = fs.readFileSync(0, "utf-8");
  } catch {
    // stdin empty
  }

  let parsed = {};
  if (inputData) {
    try {
      parsed = JSON.parse(inputData);
    } catch {
      // ignore
    }
  }

  // Check if target file was a .ts or .tsx file
  const targetFile = parsed.toolCall?.args?.TargetFile || "";
  const isTs = targetFile.endsWith(".ts") || targetFile.endsWith(".tsx");

  if (isTs) {
    try {
      execSync("npx tsc --noEmit", { stdio: "ignore" });
    } catch (err) {
      // Type error detected
      process.stderr.write(`[typecheck-hook] TypeScript errors detected after editing ${targetFile}\n`);
    }
  }

  // PostToolUse contract expects an empty JSON object
  process.stdout.write(JSON.stringify({}));
}

main();
