const fs = require("fs");
const path = require("path");

const cargoPath = path.join(
  __dirname,
  "validflow-frontend",
  "src-tauri",
  "Cargo.toml"
);
const pkg = require("./package.json");

const newVersion = pkg.version;

let cargoToml = fs.readFileSync(cargoPath, "utf-8");

cargoToml = cargoToml.replace(
  /^version\s*=\s*"\d+\.\d+\.\d+"/m,
  `version = "${newVersion}"`
);

fs.writeFileSync(cargoPath, cargoToml);

console.log(`✅ Synced version to Cargo.toml: ${newVersion}`);
