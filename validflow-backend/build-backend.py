import PyInstaller.__main__
import platform

# Detect platform target triple


def get_target_triple():
    system = platform.system().lower()
    arch = platform.machine().lower()

    if system == "windows":
        return "x86_64-pc-windows-msvc"
    elif system == "darwin":
        return "aarch64-apple-darwin" if arch == "arm64" else "x86_64-apple-darwin"
    elif system == "linux":
        return "x86_64-unknown-linux-gnu"
    else:
        raise RuntimeError(f"Unsupported platform: {system}")


target_triple = get_target_triple()
binary_name = f"start-{target_triple}"

PyInstaller.__main__.run([
    "--onefile",
    "--distpath", "../validflow-frontend/src-tauri/bin",
    "--name", binary_name,
    "start.py"
])
