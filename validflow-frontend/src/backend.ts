import { Command } from "@tauri-apps/plugin-shell";

export let backendProcess: Awaited<ReturnType<typeof Command.prototype.spawn>> | null =
  null;

export async function startBackend() {
  try {
    const command = Command.sidecar("bin/start", ["args", "if", "any"]);
    backendProcess = await command.spawn();
    command.on("error", (err) => {
      console.error("Sidecar error:", err);
    });

    console.log("✅ Backend started");
  } catch (error) {
    console.error("❌ Failed to start backend:", error);
  }
}

export async function stopBackend() {
  try {
    if (backendProcess) {
      await backendProcess.kill();
      backendProcess = null;
      console.log("✅ Backend stopped");
    } else {
      console.warn("⚠️ No backend process to stop");
    }
  } catch (error) {
    console.error("❌ Failed to stop backend:", error);
  }
}
