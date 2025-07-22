const fs = require("fs");
const path = require("path");

const frontendDir = path.join(__dirname, "validflow-frontend");
const cargoPath = path.join(frontendDir, "src-tauri", "Cargo.toml");
const tauriConfPath = path.join(frontendDir, "src-tauri", "tauri.conf.json");
const pkg = require("./package.json");

const newVersion = pkg.version;

// === Update Cargo.toml ===
let cargoToml = fs.readFileSync(cargoPath, "utf-8");
cargoToml = cargoToml.replace(
  /^version\s*=\s*"\d+\.\d+\.\d+"/m,
  `version = "${newVersion}"`
);
fs.writeFileSync(cargoPath, cargoToml);

// === Update tauri.conf.json ===
const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, "utf-8"));
tauriConf.version = newVersion;
fs.writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2));

console.log(
  `✅ Synced version to Cargo.toml and tauri.conf.json: ${newVersion}`
);
