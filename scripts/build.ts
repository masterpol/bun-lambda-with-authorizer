import { $ } from "bun";
import path from "path";
import fs from "fs";

const rootDir = path.resolve(__dirname, "../functions");
const BASE_FILE = "index.ts";
const dirs = fs.readdirSync(rootDir);
const minify = !!process.env.MINIFY;

const filesToBuild: string[] = dirs.map(dir => `${rootDir}/${dir}/${BASE_FILE}`);

await Bun.build({
  entrypoints: filesToBuild,
  outdir: "build", 
  target: "node",
  minify
});

const templatesDir = path.resolve(__dirname, "./templates");

function createMakefile(dir: string) {
  const makefileTemplatePath = path.join(templatesDir, "Makefile");
  const folderName = dir.split("/").at(-1) ?? "";
  const lambdaName = folderName.split("-")
    .map(item => capitalize(item))
    .join("");
  const makefileContent = fs.readFileSync(makefileTemplatePath, "utf-8").replaceAll("build:", `build-${lambdaName}:`);

  const makefilePath = path.join(dir, "Makefile");
  fs.writeFileSync(makefilePath, makefileContent);
  console.log(`Makefile created at ${makefilePath}`);
}

function processSubfolders(outputDir: string) {
  const subfolders = fs.readdirSync(outputDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(outputDir, dirent.name));

  subfolders.forEach(subfolder => {
    createMakefile(subfolder);
  });
}

function capitalize(item: string) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

const outputDir = path.resolve(__dirname, "../build");
processSubfolders(outputDir);

await $`sam build`;
console.log("================= Build success =================");