import { Command } from "@tauri-apps/plugin-shell";

export async function startBackend() {
  try {
    const command = Command.sidecar("bin/start", ["args", "if", "any"]);
    await command.spawn();
    command.on("error", (err) => {
      console.error("Sidecar error:", err);
    });

    console.log("✅ Backend started");
  } catch (error) {
    console.error("❌ Failed to start backend:", error);
  }
}
