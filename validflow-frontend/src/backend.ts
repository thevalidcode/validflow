import { Command } from "@tauri-apps/plugin-shell";

export async function startBackend() {
  try {
    const command = Command.sidecar("start");
    await command.spawn();
    console.log("✅ Backend started");
  } catch (error) {
    console.error("❌ Failed to start backend:", error);
  }
}
