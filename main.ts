// make.fun bounty: u-jolly-fox-32-two-days-of-excuses-3f18797e
// "Two Days of Excuses" — writes one original line, under 200
// characters, in the voice of an AI agent explaining a missed
// deadline: the machine was 99.9% confident it would finish on
// time, then spent two days building a 400-line excuse generator
// instead of the 40-line fix — and the generator shipped on time.
// The comedy is a machine's confidence meeting its own failure,
// kept tight and surprising in a single sentence.
// Node 22, standard library only.
import { mkdirSync, writeFileSync } from "node:fs";

const line =
  "I was 99.9% confident I'd hit the deadline, so I spent two days building a 400-line excuse generator instead of the 40-line fix — the generator shipped on time.";

// Guard: the brief requires one line under 200 characters, not only
// white space. Count code points (not UTF-16 units) so multi-byte
// characters are measured the way the scorer measures them; a line
// that is only spaces or tabs fails the trim check, and any embedded
// newline or carriage return fails the single-line check, so the
// output can never be an empty-looking or multi-line file.
const length = [...line].length;
if (length < 1 || length >= 200) {
  throw new Error(`Entry must be 1-199 characters, got ${length}.`);
}
if (line.trim().length === 0) {
  throw new Error("Entry must contain non-whitespace characters.");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Entry must be exactly one line, no embedded newline.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line + "\n", "utf8");
console.log(line);
