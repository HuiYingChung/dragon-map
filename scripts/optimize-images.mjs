import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();

const jobs = [
  {
    input: "public/map.png",
    output: "public/map.webp",
    resize: { width: 1400, height: 934, fit: "inside", withoutEnlargement: true },
    webp: { quality: 68, effort: 6 },
  },
];

const dragonDir = path.join(projectRoot, "public", "dragons");
const dragonFiles = (await fs.readdir(dragonDir)).filter((file) =>
  file.toLowerCase().endsWith(".png"),
);

for (const file of dragonFiles) {
  jobs.push({
    input: path.join("public", "dragons", file),
    output: path.join("public", "dragons", file.replace(/\.png$/i, ".webp")),
    resize: { width: 1600, height: 1600, fit: "inside", withoutEnlargement: true },
    webp: { quality: 72, alphaQuality: 82, effort: 6 },
  });
}

for (const job of jobs) {
  const inputPath = path.join(projectRoot, job.input);
  const outputPath = path.join(projectRoot, job.output);

  await sharp(inputPath)
    .resize(job.resize)
    .webp(job.webp)
    .toFile(outputPath);

  const [inputStat, outputStat, metadata] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outputPath),
    sharp(outputPath).metadata(),
  ]);

  const beforeMb = (inputStat.size / (1024 * 1024)).toFixed(2);
  const afterMb = (outputStat.size / (1024 * 1024)).toFixed(2);

  console.log(
    `${job.output}: ${metadata.width}x${metadata.height} ${beforeMb}MB -> ${afterMb}MB`,
  );
}
