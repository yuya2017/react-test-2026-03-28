import { spawnSync } from "node:child_process";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const mode = process.argv[2] ?? "all";
const root = new URL("..", import.meta.url);
const rootPath = fileURLToPath(root);
const srcPath = fileURLToPath(new URL("./src", root));

const bins = {
  eslint: new URL("./node_modules/.bin/eslint", root),
  prettier: new URL("./node_modules/.bin/prettier", root),
  oxlint: new URL("./node_modules/.bin/oxlint", root),
  biome: new URL("./node_modules/.bin/biome", root),
  vp: new URL("./node_modules/.bin/vp", root)
};

const suites = {
  legacy: [
    ["eslint", [srcPath]],
    ["prettier", ["--write", srcPath]]
  ],
  raw: [
    ["oxlint", ["--config", ".oxlintrc.json", srcPath]],
    ["biome", ["check", "--write", srcPath]]
  ],
  fast: [["vp", ["check", "--fix", srcPath]]]
};

const selectedModes =
  mode === "all" ? ["legacy", "raw", "fast"] : mode === "legacy" || mode === "raw" || mode === "fast" ? [mode] : null;

if (!selectedModes) {
  console.error(`Unknown benchmark mode: ${mode}`);
  process.exit(1);
}

const backupRoot = await mkdtemp(path.join(os.tmpdir(), "vite-plus-benchmark-"));
const backupSrc = path.join(backupRoot, "src");
await cp(srcPath, backupSrc, { recursive: true });

async function restoreSource() {
  await rm(srcPath, { force: true, recursive: true });
  await cp(backupSrc, srcPath, { recursive: true });
}

for (const suiteName of selectedModes) {
  await restoreSource();
  console.log(`\n== ${suiteName} ==`);
  const runs = [];

  for (const [commandName, args] of suites[suiteName]) {
    const bin = fileURLToPath(bins[commandName]);
    const start = performance.now();
    const result = spawnSync(bin, args, {
      cwd: rootPath,
      env: {
        ...process.env,
        NODE_OPTIONS: `--import tsx ${process.env.NODE_OPTIONS ?? ""}`.trim()
      },
      stdio: "inherit"
    });
    const duration = performance.now() - start;

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }

    runs.push({ commandName, duration });
  }

  for (const run of runs) {
    console.log(`${run.commandName}: ${run.duration.toFixed(0)}ms`);
  }
}

await restoreSource();
await rm(backupRoot, { force: true, recursive: true });
