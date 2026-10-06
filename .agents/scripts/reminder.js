// Node.js hook handler for Antigravity PreInvocation
// Injects contextual reminder message before model execution

const fs = require("fs");

function main() {
  try {
    fs.readFileSync(0, "utf-8"); // read stdin
  } catch {
    // ignore
  }

  const output = {
    injectSteps: [
      {
        ephemeralMessage: "[Portfolio Rule Reminder] Strict TypeScript (no 'any'). Preserve VS Code theme tokens and verify with `npx tsc --noEmit` after edits."
      }
    ]
  };

  process.stdout.write(JSON.stringify(output));
}

main();
